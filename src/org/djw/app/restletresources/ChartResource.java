package org.djw.app.restletresources;

import openfda.classes.OpenFDAClient;

import org.apache.log4j.Logger;
import org.djw.tools.db.DBTableJNDI;
import org.djw.tools.json.ResponseJson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

public class ChartResource extends ServerResource {
	final static Logger logger = Logger.getLogger(ChartResource.class);
	@Get
	public Representation represent() throws JSONException {
		
		JSONArray chartdata = new JSONArray();
		String ResultType = "";
		if (getRequest().getAttributes().get("ResultType") != null ) ResultType = (String) getRequest().getAttributes().get("ResultType");
		String ThingList = "";
		if (getRequest().getAttributes().get("ThingList") != null ) ThingList = (String) getRequest().getAttributes().get("ThingList");
		JSONObject jBody = new JSONObject();
		
		String Things = "";
		if (!ResultType.equals("")){
			if (ResultType.equals("drugs")){
				String[] drugs = ThingList.split("~");
				String Drug = "";
				for (int r=0; r<drugs.length; r++){
					Drug += "patient.drug.medicinalproduct:\"" + drugs[r] + "\"";
					if (r < drugs.length -1){
						Drug += "+AND+";
					}
				}
				Things = Drug;
			}
			if (ResultType.equals("reactions")){
				String[] reactions = ThingList.split("~");
				String Reaction = "";
				for (int r=0; r<reactions.length; r++){
					Reaction += "patient.reaction.reactionmeddrapt:\"" + reactions[r] + "\"";
					if (r < reactions.length -1){
						Reaction += "+AND+";
					}
				}
				Things = Reaction;
			}
		}
		
		String ServiceURI = "/event.json?search=receivedate:[20040101+TO+20150101]+AND+" + Things + "&count=receivedate";

		try{
			OpenFDAClient restClient = new OpenFDAClient();
			JSONObject json = restClient.getService(ServiceURI);
			JSONArray results = json.getJSONArray("results");
			JSONArray chartHeader = new JSONArray();
			chartHeader.put("Time");
			chartHeader.put("Count");
			chartdata.put(chartHeader);
			for (int i=0; i<results.length(); i++){
				JSONObject cd = results.getJSONObject(i);
				String time = cd.getString("time");
				int count = cd.getInt("count");
				JSONArray jRec = new JSONArray();
				jRec.put(time);
				jRec.put(count);
				chartdata.put(jRec);
			}
			
			jBody.put("chartdata", chartdata);
		} catch (Exception e){
			logger.fatal("an error has occurred: " + e);
		}
		
//		TestDBObject dbObject = new TestDBObject();
//		if (ChartType.equals("Column")){
//			String sqlStatement = "select first_name,total_spent,avg_order from test_table";
//			JSONArray jChartData = dbObject.getListJSONChart(sqlStatement,dbType); 
//			jBody.put("ChartData", jChartData);
//		}
//		if (ChartType.equals("Pie")){
//			String sqlStatement = "select first_name,total_spent from test_table limit 5";
//			JSONArray jChartData = dbObject.getListJSONPieChart(sqlStatement,dbType); 
//			jBody.put("ChartData", jChartData);
//		}
//		if (ChartType.equals("Scatter")){
//			String sqlStatement = "select total_spent,avg_order from test_table limit 5";
//			JSONArray jChartData = dbObject.getListJSONScatterChart(sqlStatement,dbType); 
//			jBody.put("ChartData", jChartData);
//		}
//		if (ChartType.equals("Line")){
//			String sqlStatement = "select first_name,total_spent,avg_order from test_table";
//			JSONArray jChartData = dbObject.getListJSONChart(sqlStatement,dbType); 
//			jBody.put("ChartData", jChartData);
//		}
		
		
		ResponseJson jResponse = new ResponseJson();
		Representation rep = null;
		jResponse.setStatusCode(0);
		jResponse.setStatusMessage("");
		jResponse.setBody(jBody);
		rep = new JsonRepresentation(jResponse.getResponse(jResponse));
		return rep;
	}
}

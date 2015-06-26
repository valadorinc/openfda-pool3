package org.djw.app.restletresources;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import openfda.classes.OpenFDAClient;
import openfda.classes.ServerAuth;

import org.apache.log4j.Logger;
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
		int StatusCode = 0;
		String Message = "";
		String ServerKey = "";
		if (getRequest().getAttributes().get("ServerKey") != null ) ServerKey = (String) getRequest().getAttributes().get("ServerKey");
		ServerAuth serverAuth = new ServerAuth();
		boolean Authenticated = serverAuth.authenticate(ServerKey);
		JSONObject jBody = new JSONObject();
		if (Authenticated){
			JSONArray chartdata = new JSONArray();
			String ResultType = "";
			if (getRequest().getAttributes().get("ResultType") != null ) ResultType = (String) getRequest().getAttributes().get("ResultType");
			String ThingList = "";
			if (getRequest().getAttributes().get("ThingList") != null ) ThingList = (String) getRequest().getAttributes().get("ThingList");
			
			
			String Things = "";
			if (!ResultType.equals("")){
				if (ResultType.equals("drugs")){
					String[] drugs = ThingList.split("~");
					String Drug = "";
					for (int r=0; r<drugs.length; r++){
						Drug += "patient.drug.openfda.substance_name:\"" + drugs[r] + "\"";
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
			
			String ServiceURI = "/event.json?search=" + Things + "&count=patient.patientonsetage";
	
			try{
				OpenFDAClient restClient = new OpenFDAClient();
				JSONObject json = restClient.getService(ServiceURI);
				JSONArray results = json.getJSONArray("results");
				
				JSONArray chartHeader = new JSONArray();
				chartHeader.put("Time");
				chartHeader.put("Count");
				chartdata.put(chartHeader);
				ArrayList<Integer> Terms = new ArrayList<Integer>();
				ArrayList<Integer> Counts = new ArrayList<Integer>();
				
				int numResults = results.length();
				for (int i=0; i<numResults; i++){
					JSONObject result = results.getJSONObject(i);
					String term = result.getString("term");
					int numDec = term.indexOf(".");
					if (numDec > -1 ){
						term = term.substring(0, term.indexOf("."));
					}
					int iTerm = Integer.parseInt(term);
					if (iTerm < 100){
						Terms.add(iTerm);
						Counts.add(result.getInt("count"));
					}
				}
				ArrayList<Integer> newOrder = new ArrayList<Integer>();
				for (int i=0; i<Terms.size(); i++){
					newOrder.add(Terms.get(i));
				}
				Collections.sort(newOrder);
				logger.debug("Terms: " + Terms.toString());
				logger.debug("Counts: " + Counts.toString());
				logger.debug("newOrder: " + newOrder.toString());
				for (int i=0; i<newOrder.size(); i++){
					int idx = Terms.indexOf(newOrder.get(i));
					JSONArray jRec = new JSONArray();
					jRec.put(Terms.get(idx));
					jRec.put(Counts.get(idx));
					chartdata.put(jRec);
				}

//				JSONArray jSort = new JSONArray();
//				for (int i=0; i<results.length(); i++){
//					JSONObject cd = results.getJSONObject(i);
//					String term = cd.getString("term");
//					String count = cd.getString("count");
//					JSONObject jRec = new JSONObject();
//					jRec.put("Term",term);
//					jRec.put("Count",count);
//					jSort.put(jRec);
//				}
//
//				JSONArray sortedArray = this.sortData(jSort);
//logger.debug(jSort.toString(1));
//logger.debug(sortedArray.toString(1));
				
//				
//				for (int i=0; i<results.length(); i++){
//					JSONObject cd = results.getJSONObject(i);
//					String time = cd.getString("term");
//					int count = cd.getInt("count");
//					JSONArray jRec = new JSONArray();
//					jRec.put(time);
//					jRec.put(count);
//					chartdata.put(jRec);
//				}
				
				jBody.put("chartdata", chartdata);
			} catch (Exception e){
				logger.fatal("an error has occurred: " + e);
			}
			StatusCode = 0;
		} else {
			StatusCode = 1;
			Message = "Invalid authorization key.";
		}
		ResponseJson jResponse = new ResponseJson();
		Representation rep = null;
		jResponse.setStatusCode(StatusCode);
		jResponse.setStatusMessage(Message);
		jResponse.setBody(jBody);
		rep = new JsonRepresentation(jResponse.getResponse(jResponse));
		return rep;
	}
	
	private JSONArray sortData(JSONArray jArray){
		JSONArray sortedArray = new JSONArray();
		
		try{
		    String jsonArrStr = jArray.toString();
	
		    JSONArray jsonArr = new JSONArray(jsonArrStr);
		    JSONArray sortedJsonArray = new JSONArray();
	
		    List<JSONObject> jsonValues = new ArrayList<JSONObject>();
		    for (int i = 0; i < jsonArr.length(); i++) {
		        jsonValues.add(jsonArr.getJSONObject(i));
		    }
		    Collections.sort( jsonValues, new Comparator<JSONObject>() {
		        //You can change "Name" with "ID" if you want to sort by ID
		        private static final String KEY_NAME = "Term";
	
		        @Override
		        public int compare(JSONObject a, JSONObject b) {
		            String valA = new String();
		            String valB = new String();
	
		            try {
		                valA = (String) a.get(KEY_NAME);
		                valB = (String) b.get(KEY_NAME);
		            } 
		            catch (JSONException e) {
		                //do something
		            }
	
		            return valA.compareTo(valB);
		            //if you want to change the sort order, simply use the following:
		            //return -valA.compareTo(valB);
		        }
		    });
	
		    for (int i = 0; i < jsonArr.length(); i++) {
		        sortedJsonArray.put(jsonValues.get(i));
		    }
		} catch (Exception e){
			logger.fatal("an error occurred: " + e);
		}
		return sortedArray;
	}
}

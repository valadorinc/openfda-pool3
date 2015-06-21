package org.djw.app.restletresources;


import java.util.ArrayList;

import openfda.classes.OpenFDAClient;

import org.apache.log4j.Logger;
import org.djw.tools.json.ResponseJson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

public class FDADrugResource extends ServerResource {
	final static Logger logger = Logger.getLogger(FDADrugResource.class);
	
	@Get
	public Representation represent() throws JSONException {

		JSONObject jBody = new JSONObject();
		JSONObject ReportOutput = new JSONObject();
		String Message = "";
		int Status = 0;
		try {
			
			JSONArray Reactions = new JSONArray();
			String DrugList = "";
			if (getRequest().getAttributes().get("druglist") != null ) DrugList = (String) getRequest().getAttributes().get("druglist");
			
			String[] drugs = DrugList.split("~");
			String Drug = "";
			for (int r=0; r<drugs.length; r++){
				Drug += "patient.drug.medicinalproduct:\"" + drugs[r] + "\"";
				if (r < drugs.length -1){
					Drug += "+AND+";
				}
			}

			String ServiceURI = "/event.json?search=" + Drug + "&count=patient.reaction.reactionmeddrapt.exact";

			OpenFDAClient restClient = new OpenFDAClient();
			JSONObject json = restClient.getService(ServiceURI);
			JSONArray results = json.getJSONArray("results");

			for (int p=0; p<results.length(); p++){
				JSONObject rec = results.getJSONObject(p);
				String rName = rec.getString("term");
				int rCount = rec.getInt("count");
				rec.put("reaction", rName);
				rec.put("count", rCount);
				Reactions.put(rec);
			}
			
			ReportOutput.put("reactions", Reactions);

//logger.debug(json.toString(1));	
			
		} catch (Exception e) {
			Status = 1;
			Message = "an error has occurred: " + e;
		}

		
		jBody.put("ReportOutput", ReportOutput);

		ResponseJson jResponse = new ResponseJson();
		Representation rep = null;
		jResponse.setStatusCode(Status);
		jResponse.setStatusMessage(Message);
		jResponse.setBody(jBody);
		rep = new JsonRepresentation(jResponse.getResponse(jResponse));
		return rep;
	}
	
	private JSONArray dedupeDrugs(ArrayList<String> drugNames, ArrayList<String> drugIndications){
		ArrayList<String> uniqueNames = new ArrayList<String>();
		JSONArray cleanList = new JSONArray();
		try{
			for (int i=0; i<drugNames.size(); i++){
				String dName = drugNames.get(i);
				int dIndex = uniqueNames.indexOf(dName);
				if (dIndex == -1){
					String dIndic = drugIndications.get(i);
					uniqueNames.add(dName);
					JSONObject Drug = new JSONObject();
					Drug.put("DrugName", dName);
					Drug.put("DrugIndication", dIndic);
					cleanList.put(Drug);
				}
			}
//			ArrayList<String> dNames = new ArrayList<String>();
//			ArrayList<String> dInds = new ArrayList<String>();
//			for (int n=0; n<cleanList.length(); n++){
//				JSONObject jD = cleanList.getJSONObject(n);
//				dNames.add(jD.getString("DrugName"));
//				dInds.add(jD.getString("DrugIndication"));
//			}
//			JSONArray jSorted = new JSONArray();
//			ArrayList<String> SortOrder = dNames;
//			Collections.sort(SortOrder);
//			for (int i=0; i<SortOrder.size(); i++){
//				String dname = SortOrder.get(i);
//				int sIdx = dNames.indexOf(dname);
//				JSONObject jRec = new JSONObject();
//				jRec.put("DrugName", dNames.get(sIdx));
//				jRec.put("DrugIndication", dInds.get(sIdx));
//				jSorted.put(jRec);
//			}
//			cleanList = jSorted;
			
			
		} catch(Exception e){
			
		}
		return cleanList;
	}
	

}


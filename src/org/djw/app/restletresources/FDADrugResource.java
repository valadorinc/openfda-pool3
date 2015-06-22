package org.djw.app.restletresources;


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
}


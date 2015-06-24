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

public class OpenFDAResource extends ServerResource {
	final static Logger logger = Logger.getLogger(OpenFDAResource.class);
	
	@Get
	public Representation represent() throws JSONException {

		JSONArray Drugs = new JSONArray();
		JSONObject jBody = new JSONObject();
		JSONObject ReportOutput = new JSONObject();
		String Message = "";
		int Status = 0;
		try {
			
			String ReactionList = "";
			if (getRequest().getAttributes().get("reactionlist") != null ) ReactionList = (String) getRequest().getAttributes().get("reactionlist");
			
			String[] reactions = ReactionList.split("~");
			String Reaction = "";
			for (int r=0; r<reactions.length; r++){
				Reaction += "patient.reaction.reactionmeddrapt:\"" + reactions[r] + "\"";
				if (r < reactions.length -1){
					Reaction += "+AND+";
				}
			}
			
			String ServiceURI = "/event.json?search=" + Reaction + "&count=patient.drug.medicinalproduct.exact";
			

			OpenFDAClient restClient = new OpenFDAClient();
			JSONObject json = restClient.getService(ServiceURI);
			JSONArray results = json.getJSONArray("results");
			for (int i=0; i<results.length(); i++){
				JSONObject result = results.getJSONObject(i);
				String Drug = result.getString("term");
				int Occurrences = result.getInt("count");
				JSONObject jDrug = new JSONObject();
				jDrug.put("DrugName", Drug);
				jDrug.put("Occurrences", Occurrences);
				Drugs.put(jDrug);
			}

			
			ReportOutput.put("drugs", Drugs);

//logger.debug(metaResults.toString(1));			
			
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


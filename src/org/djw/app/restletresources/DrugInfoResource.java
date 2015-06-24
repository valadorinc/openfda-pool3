package org.djw.app.restletresources;


import openfda.classes.OpenFDAClient;
import openfda.classes.ServerAuth;

import org.apache.log4j.Logger;
import org.djw.tools.db.DBTableJNDI;
import org.djw.tools.json.OutputFormatter;
import org.djw.tools.json.ResponseJson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

public class DrugInfoResource extends ServerResource {
	final static Logger logger = Logger.getLogger(DrugInfoResource.class);
	
	@Get
	public Representation represent() throws JSONException {

		String Message = "";
		int Status = 0;
		JSONObject jBody = new JSONObject();
		
		String ServerKey = "";
		if (getRequest().getAttributes().get("ServerKey") != null ) ServerKey = (String) getRequest().getAttributes().get("ServerKey");
		ServerAuth serverAuth = new ServerAuth();
		boolean Authenticated = serverAuth.authenticate(ServerKey);

		if (Authenticated){
			try{
				String DrugName = "";
				String spl_set_id = "";
				if (getRequest().getAttributes().get("DrugName") != null ) DrugName = (String) getRequest().getAttributes().get("DrugName");
		
				String ServiceURI = "/label.json?search=openfda.substance_name:\"" + DrugName + "\"";
	
				OpenFDAClient restClient = new OpenFDAClient();
				JSONObject json = restClient.getService(ServiceURI);
				JSONArray results = json.getJSONArray("results");
				if (results.length() > 0){
					JSONObject drug = results.getJSONObject(0);
					JSONObject openfda = drug.getJSONObject("openfda");
					spl_set_id = openfda.getJSONArray("spl_set_id").getString(0);
					
				}
				
				int numResults = results.length();
				Message = "";
				Status = 0;
				jBody.put("count", numResults);
				jBody.put("spl_set_id", spl_set_id);
			} catch (Exception e){
				Status = 1;
				Message = "an error occurred: " + e;
			}
		} else {
			Status = 1;
			Message = "invalid authentication token";
		}
		ResponseJson jResponse = new ResponseJson();
		Representation rep = null;
		jResponse.setStatusCode(Status);
		jResponse.setStatusMessage(Message);
		jResponse.setBody(jBody);
		rep = new JsonRepresentation(jResponse.getResponse(jResponse));
		return rep;
	}
	

}


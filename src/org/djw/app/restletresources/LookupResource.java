package org.djw.app.restletresources;


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

public class LookupResource extends ServerResource {
	final static Logger logger = Logger.getLogger(LookupResource.class);
	
	@Get
	public Representation represent() throws JSONException {
		String LookupType = "";
		if (getRequest().getAttributes().get("lookuptype") != null ) LookupType = (String) getRequest().getAttributes().get("lookuptype");
		
		String dbType = "";
		String sqlStatement = "";
		
		if (LookupType.equals("reactions")){
			sqlStatement = "select reaction from reactions order by reaction";
		}
		if (LookupType.equals("drugs")){
			sqlStatement = "select drugname from drugs order by drugname";
		}
		
		DBTableJNDI dbTable = new DBTableJNDI();
		dbTable = dbTable.getDBTableResults(sqlStatement, dbType);
		OutputFormatter formatter = new OutputFormatter();
		JSONArray jResults = formatter.getJsonArray(dbTable);
		
		JSONObject jBody = new JSONObject();
		String Message = "";
		int Status = 0;

		
		jBody.put("results", jResults);

		ResponseJson jResponse = new ResponseJson();
		Representation rep = null;
		jResponse.setStatusCode(Status);
		jResponse.setStatusMessage(Message);
		jResponse.setBody(jBody);
		rep = new JsonRepresentation(jResponse.getResponse(jResponse));
		return rep;
	}
	

}


package org.djw.app.restletresources;

import org.apache.log4j.Logger;
import org.djw.tools.db.DBTableJNDI;
import org.djw.tools.json.OutputFormatter;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

public class AdHocDBResource extends ServerResource {
	final static Logger logger = Logger.getLogger(AdHocDBResource.class);
	
	@Post("json:json")
	public Representation acceptJson(JsonRepresentation represent){
		Representation rep = null;
		try {
			JSONObject jsonobject = represent.getJsonObject();
			String requestString = jsonobject.getString("request");
			JSONObject requestJson = new JSONObject(requestString);
			
			String SQLStatement = requestJson.getString("SQLStatement");
			if(logger.isDebugEnabled()){
				logger.debug("SQLStatement: " + SQLStatement);
	    	}
			
			DBTableJNDI dbTable = new DBTableJNDI();
			String dbType="";
			dbTable = dbTable.getDBTableResults(SQLStatement,dbType);
			OutputFormatter formatter = new OutputFormatter();
			JSONObject jResults = formatter.getTableJson(dbTable);
			if(logger.isDebugEnabled()){
				logger.debug("jResults: " + jResults.toString());
	    	}

//			JSONObject jReportResults = query.runBarQuery(jReportParams, ConfigType, FormatOutput, jAdHocCols, BarOperator);

//			JSONObject jBody = new JSONObject();
//			jBody.put("SQLStatement", SQLStatement);

//			jBody.put("Body", jBody);

//		ResponseJson jResponse = new ResponseJson();
//
//		jResponse.setStatusCode(0);
//		jResponse.setStatusMessage("");
//		jResponse.setBody(jBody);
//		rep = new JsonRepresentation(jResponse.getResponse(jResponse));

		rep = new JsonRepresentation(jResults.toString());
		
//		getResponse().setStatus(Status.SUCCESS_OK);
		} catch (Exception e) {
//			e.printStackTrace();
//			JSONStringer jsReply = new JSONStringer();
//			try {
//				jsReply.object();
//				jsReply.key("CODE").value("Error");
//				jsReply.key("DESC").value(e.getMessage());
//				jsReply.endObject();
//			} catch (JSONException e1) {
//				e1.printStackTrace();
//			}
//			getResponse().setStatus(Status.SERVER_ERROR_INTERNAL);
		}
		return rep;
	}

}
package org.djw.app.restletresources;

import java.net.URLDecoder;

import org.apache.log4j.Logger;
import org.djw.tools.db.DBTableJNDI;
import org.djw.tools.json.OutputFormatter;
import org.djw.tools.json.ResponseJson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

public class FormatTestResource extends ServerResource {
	final static Logger logger = Logger.getLogger(FormatTestResource.class);
	
	@SuppressWarnings("deprecation")
	@Get
	public Representation represent() throws JSONException {
		String sqlStatement = "";
		String format = "";
		if (getRequest().getAttributes().get("sql") != null ) sqlStatement = (String) getRequest().getAttributes().get("sql");
		if (getRequest().getAttributes().get("format") != null ) format = (String) getRequest().getAttributes().get("format");
		if(logger.isDebugEnabled()){
			logger.debug(sqlStatement);
		}
		sqlStatement = URLDecoder.decode(sqlStatement);
		if(logger.isDebugEnabled()){
			logger.debug(sqlStatement);
		}
		JSONObject jBody = new JSONObject();
		DBTableJNDI dbTable = new DBTableJNDI();
		OutputFormatter formatter = new OutputFormatter();
		
		if (!sqlStatement.equals("") && !format.equals("")){
			JSONObject jResult = new JSONObject();
			String dbType = "";
			dbTable = dbTable.getDBTableResults(sqlStatement, dbType);
			if (format.equals("getJson")){
				JSONObject jRecords = formatter.getJson(dbTable);
				jResult.put("result",jRecords);
			}
			if (format.equals("getLineChartJson")){
				JSONArray jRecords = formatter.getLineChartJson(dbTable);
				jResult.put("result",jRecords);
			}
			if (format.equals("getPlainJson")){
				JSONArray jRecords = formatter.getPlainJson(dbTable);
				jResult.put("result",jRecords);
			}
			if (format.equals("getSingleJson")){
				JSONObject jRecords = formatter.getSingleJson(dbTable);
				jResult.put("result",jRecords);
			}
			if (format.equals("getSingleJsonArray")){
				JSONArray jRecords = formatter.getSingleJsonArray(dbTable);
				jResult.put("result",jRecords);
			}
			if (format.equals("getTableJson")){
				JSONObject jRecords = formatter.getTableJson(dbTable);
				jResult.put("result",jRecords);
			}
			if (format.equals("getCSV")){
				String Delimiter = ",";
				StringBuffer csvOutput = formatter.getCSV(dbTable, Delimiter);
				jResult.put("result",csvOutput);
			}
			jBody.put("output", jResult);
		} else {
//			jBody = customer.getCustomerWithOrders(CustomerID);
		}
		ResponseJson jResponse = new ResponseJson();
		Representation rep = null;
		jResponse.setStatusCode(0);
		jResponse.setStatusMessage("");
		jResponse.setBody(jBody);
		rep = new JsonRepresentation(jResponse.getResponse(jResponse));
		return rep;
	}

	@Post("json:json")
	public Representation acceptJson(JsonRepresentation represent) throws ResourceException {
		Representation rep = null;
		try {
			JSONObject jsonobject = represent.getJsonObject();
			String requestString = jsonobject.getString("request");
			if(logger.isDebugEnabled()){
				logger.debug(requestString);
			}

			JSONObject jParams = new JSONObject(requestString);
			String sqlStatement = jParams.getString("SQLStatement");
			String format = "";
			if (getRequest().getAttributes().get("format") != null ) format = (String) getRequest().getAttributes().get("format");
			DBTableJNDI dbTable = new DBTableJNDI();
			OutputFormatter formatter = new OutputFormatter();
			JSONObject jBody = new JSONObject();
			if (!sqlStatement.equals("") && !format.equals("")){
				JSONObject jResult = new JSONObject();
				String dbType = "";
				dbTable = dbTable.getDBTableResults(sqlStatement, dbType);
				if (format.equals("getJson")){
					JSONObject jRecords = formatter.getJson(dbTable);
					jResult.put("result",jRecords);
				}
				if (format.equals("getLineChartJson")){
					JSONArray jRecords = formatter.getLineChartJson(dbTable);
					jResult.put("result",jRecords);
				}
				if (format.equals("getPlainJson")){
					JSONArray jRecords = formatter.getPlainJson(dbTable);
					jResult.put("result",jRecords);
				}
				if (format.equals("getSingleJson")){
					JSONObject jRecords = formatter.getSingleJson(dbTable);
					jResult.put("result",jRecords);
				}
				if (format.equals("getSingleJsonArray")){
					JSONArray jRecords = formatter.getSingleJsonArray(dbTable);
					jResult.put("result",jRecords);
				}
				if (format.equals("getTableJson")){
					JSONObject jRecords = formatter.getTableJson(dbTable);
					jResult.put("result",jRecords);
				}
				if (format.equals("getCSV")){
					String Delimiter = ",";
					StringBuffer csvOutput = formatter.getCSV(dbTable, Delimiter);
					jResult.put("result",csvOutput);
				}
				jBody.put("output", jResult);
			} else {
//				jBody = customer.getCustomerWithOrders(CustomerID);
			}
			
			

			getResponse().setStatus(Status.SUCCESS_ACCEPTED);
			ResponseJson responseJson = new ResponseJson();
			responseJson.setStatusCode(0);
			responseJson.setStatusMessage("");
			responseJson.setBody(jBody);
			JSONObject jResponse = responseJson.getResponse(responseJson);
			rep = new JsonRepresentation(jResponse);
			getResponse().setStatus(Status.SUCCESS_OK);
		} catch (Exception e) {
			e.printStackTrace();
			JSONStringer jsReply = new JSONStringer();
			try {
				jsReply.object();
				jsReply.key("CODE").value("Error");
				jsReply.key("DESC").value(e.getMessage());
				jsReply.endObject();
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			getResponse().setStatus(Status.SERVER_ERROR_INTERNAL);
		}
		return rep;
	}
}



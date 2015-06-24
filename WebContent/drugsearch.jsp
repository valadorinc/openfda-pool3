<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%@ page import="openfda.classes.ServerAuth" %>
<%
String DrugList = "";
String Message = "";
JSONArray jResults = new JSONArray();
try {
	int StatusCode = 0;
    String JsonURL = "";
    
    String ServerKey = "";
    ServerAuth serverAuth = new ServerAuth();
    ServerKey = serverAuth.getKey();
	String ServiceURI = "/fda/" + ServerKey + "/lookup/drugs";

	RestClient restClient = new RestClient();
	JSONObject jResponse = restClient.getService(ServiceURI);
	JSONObject jBody = jResponse.getJSONObject("Body");
	jResults = jBody.getJSONArray("results");
	DrugList = "<option value='0'>Select Drug</option>";
	for (int i=0; i<jResults.length(); i++){
		DrugList += "<option value='" + jResults.getString(i) + "'>" + jResults.getString(i) + "</option>";
	}

	
} catch (Exception e) {
	out.println("An error has occured: " + e);
}

%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
<title>Insert title here</title>
</head>
<body>
	<div>
		<form name="subForm" method="post" action="drugresults.jsp">
			<p>
				Enter a drug: 
				<select name="drug1">
				<%= DrugList %>
				</select>
			</p>
			<p>
				Enter another drug: 
				<select name="drug2">
				<%= DrugList %>
				</select>
			</p>
			<p>
				Enter a limit <input type="text" name="limit" value="10">
			</p>
				<input type="submit">
		</form>
	</div>
</body>
</html>
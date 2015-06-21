<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%
String Message = "";
JSONArray jResults = new JSONArray();
try {
	int StatusCode = 0;
    String JsonURL = "";
	String ServiceURI = "/fda/lookup/drugs";

	RestClient restClient = new RestClient();
	JSONObject jResponse = restClient.getService(ServiceURI);
	JSONObject jBody = jResponse.getJSONObject("Body");
	jResults = jBody.getJSONArray("results");
	
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
				Enter a reaction: 
				<select name="drug1">
				<%
					for (int i=0; i<jResults.length(); i++){
						out.println("<option value='" + jResults.getString(i) + "'>" + jResults.getString(i) + "</option>");
					}
				%>
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
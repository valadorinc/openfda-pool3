<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%@ page import="openfda.classes.ServerAuth" %>
<%

String Drug = "";
String Drug2 = "";
String Limit = "";
if (request.getParameter("drug1") !=null) Drug = request.getParameter("drug1");
if (request.getParameter("drug2") !=null) Drug2 = request.getParameter("drug2");
if (request.getParameter("limit") !=null) Limit = request.getParameter("limit");

String Message = "";
String Records = "";
if (!Drug.equals("0")){
	try {
	    String ServerKey = "";
	    ServerAuth serverAuth = new ServerAuth();
	    ServerKey = serverAuth.getKey();

		int StatusCode = 0;
	    String JsonURL = "";
	    String DrugList = "";
	    DrugList += Drug;
	    if (!Drug2.equals("0")) DrugList += "~" + Drug2;
	
		String ServiceURI = "/fda/" + ServerKey + "/search/drug/" + DrugList;
	
		RestClient restClient = new RestClient();
		JSONObject jResponse = restClient.getService(ServiceURI);
//System.out.println(jResponse.toString(1));
	 	JSONObject jBody = jResponse.getJSONObject("Body");
		JSONArray cols = jBody.getJSONObject("ReportOutput").getJSONArray("cols");
		JSONArray rows = jBody.getJSONObject("ReportOutput").getJSONArray("rows");
	
		Records = "<table>";
		Records += "<tr>";
		for (int i=0; i<cols.length(); i++){
			Records += "<th>" + cols.getString(i) + "</th>";
		}
		Records += "</tr>";
		for (int i=0; i<rows.length(); i++){
			Records += "<tr>";
			for (int c=0; c<cols.length(); c++){
				JSONArray row = rows.getJSONArray(i);
				Records += "<td>" + row.getString(c) + "</td>";
			}
			Records += "</tr>";
		}
		Records += "</table>";
		
	} catch (Exception e) {
		out.println("An error has occured: " + e);
	}
} else {
	Records = "No drug selected";
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
		<p>
			Search Results.
		</p>
		<div id="searchResults">
			<%=Records %>
		</div>
		<p><a href="index.jsp">return</a></p>
	</div>
</body>
</html>
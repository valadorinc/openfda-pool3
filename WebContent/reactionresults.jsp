<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%

String Reaction = "";
String Reaction2 = "";
if (request.getParameter("reaction1") !=null) Reaction = request.getParameter("reaction1");
if (request.getParameter("reaction2") !=null) Reaction2 = request.getParameter("reaction2");

String Message = "";
String Records = "";
if (!Reaction.equals("0")){
	try {
		int StatusCode = 0;
	    String JsonURL = "";
	    String ReactionList = "";
	    ReactionList += Reaction;
	    if (!Reaction2.equals("0")) ReactionList += "~" + Reaction2;
		String ServiceURI = "/fda/search/reaction/" + ReactionList;
	
		RestClient restClient = new RestClient();
		JSONObject jResponse = restClient.getService(ServiceURI);
	 	JSONObject jBody = jResponse.getJSONObject("Body");
	 	JSONArray jRecords = new JSONArray();
		jRecords = jBody.getJSONObject("ReportOutput").getJSONArray("drugs");
	
		Records = "<table>";
		Records += "<tr><th>Drug Name</th><th>Occurrences</></tr>";
		for (int i=0; i<jRecords.length(); i++){
			JSONObject jRec = jRecords.getJSONObject(i);
			String DrugName = jRec.getString("DrugName");
			int Occurrences = jRec.getInt("Occurrences");
			Records += "<tr><td>" + DrugName + "</td><td>" + Occurrences + "</td></tr>";
		}
		Records += "</table>";
		
	} catch (Exception e) {
		out.println("An error has occured: " + e);
	}
} else {
	Records = "No reaction selected";
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
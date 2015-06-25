<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%@ page import="openfda.classes.ServerAuth" %>
<%

String DrugName = "";
if (request.getParameter("DrugName") !=null) DrugName = request.getParameter("DrugName");

String Message = "";
JSONArray images = new JSONArray();
String Images = "";
if (!DrugName.equals("")){
	try {
	    String ServerKey = "";
	    ServerAuth serverAuth = new ServerAuth();
	    ServerKey = serverAuth.getKey();

		int StatusCode = 0;
	    String JsonURL = "";
		String ServiceURI = "/fda/" + ServerKey + "/druginfo/" + DrugName;
	
		RestClient restClient = new RestClient();
		JSONObject jResponse = restClient.getService(ServiceURI);
out.println(jResponse.toString());
 	 	JSONObject jBody = jResponse.getJSONObject("Body");
 	 	JSONObject DrugInfo = jBody.getJSONObject("DrugInfo");
	 	images = DrugInfo.getJSONArray("images");
 		
	 	for (int i=0; i<images.length(); i++){
	 		Images += "'<img src='" + images.getString(i) + "'><br>";
	 	}
	 	
	} catch (Exception e) {
		out.println("An error has occured: " + e);
	}
} else {
	Images = "No images found";
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
			<%=Images%>
		</p>
		<div id="searchResults">
			
		</div>
		<p><a href="index.jsp">return</a></p>
	</div>
</body>
</html>
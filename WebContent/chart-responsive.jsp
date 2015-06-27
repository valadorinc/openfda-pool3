<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%@ page import="openfda.classes.ServerAuth" %>
<%

String Thing1 = "abdominal pain";
String Thing2 = "";
String ThingType = "reactions";

String ThingList = "0";

if (request.getParameter("Thing1") !=null) {
	Thing1 = request.getParameter("Thing1");
} else {
	Thing1 = "PREDNISONE";
}
if (request.getParameter("Thing2") !=null) {
	Thing2 = request.getParameter("Thing2");
	
} else {
	Thing2 = "";
	ThingList = Thing1;
}
if (request.getParameter("ThingType") !=null) {
	ThingType = request.getParameter("ThingType");
} else {
	ThingType = "drugs";
}

ThingList = Thing1;
if (!Thing2.equals("0")){
	ThingList = Thing1 + "~" + Thing2;
}


/* String Reaction = "";
String Reaction2 = "";
String Limit = "";
if (request.getParameter("reaction1") !=null) Reaction = request.getParameter("reaction1");
if (request.getParameter("reaction2") !=null) Reaction2 = request.getParameter("reaction2");
if (request.getParameter("limit") !=null) Limit = request.getParameter("limit");
 */
 
 String ServerKey = "";
 ServerAuth serverAuth = new ServerAuth();
 ServerKey = serverAuth.getKey();


String Message = "";
 String sResponse = "";
	try {
		int StatusCode = 0;
	    String JsonURL = "";
		//String ServiceURI = "/fda/" + ServerKey + "/chart/reactions/\"abdominal pain\"~death";
		//String ServiceURI = "/fda/" + ServerKey + "/chart/drugs/PREDNISONE";
		
		String ServiceURI = "/fda/" + ServerKey + "/chart/" + ThingType + "/" + ThingList;
	
		RestClient restClient = new RestClient();
		JSONObject jResponse = restClient.getService(ServiceURI);
	 	JSONObject jBody = jResponse.getJSONObject("Body");
	 	JSONArray jRecords = new JSONArray();
		jRecords = jBody.getJSONArray("chartdata");
//out.println(jRecords.toString());

		sResponse = jRecords.toString();
		
	} catch (Exception e) {
		out.println("An error has occured: " + e);
	}
%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
<title>Insert title here</title>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
  		var jsonData = <%=sResponse%>;
        var data = google.visualization.arrayToDataTable(jsonData);
        var options = {
          title: 'Adverse Reactions by Age',
          width: "100%"
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
      
      function resizeHandler () {
          chart.draw(data, options);
      }
      if (window.addEventListener) {
          window.addEventListener('resize', resizeHandler, false);
      }
      else if (window.attachEvent) {
          window.attachEvent('onresize', resizeHandler);
      }
      
      window.onload = resize();
      window.onresize = resize;
    </script>

</head>
<body>
	<div>
		<form name="form" method="post" action="chart-responsive.jsp">
			Type of chart:
			<select name="ThingType">
				<option value="drugs"<% if (ThingType.equals("drugs")){%> selected<%}%>>drugs</option>
				<option value="reactions"<% if (ThingType.equals("reactions")){%> selected<%}%>>reactions</option>
			</select>
			<br>
			Type of chart: <input type="text" name="Thing1" value="<%=Thing1%>"><br>
			Type of chart: <input type="text" name="Thing2" value="<%=Thing2%>"><br>
			<input type="submit">
		</form>
	</div>
	<div>
		<div id="chart_div" style="width: 100%; height: 100%;"></div>	
	</div>
</body>
</html>
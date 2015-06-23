<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.djw.tools.restlet.*" %>
<%

/* String Reaction = "";
String Reaction2 = "";
String Limit = "";
if (request.getParameter("reaction1") !=null) Reaction = request.getParameter("reaction1");
if (request.getParameter("reaction2") !=null) Reaction2 = request.getParameter("reaction2");
if (request.getParameter("limit") !=null) Limit = request.getParameter("limit");
 */
 
String Message = "";
 String sResponse = "";
	try {
		int StatusCode = 0;
	    String JsonURL = "";
		String ServiceURI = "/fda/chart/reactions/\"abdominal pain\"~death";
	
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
          title: 'Adverse Reactions'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>

</head>
<body>
	<div>
		<div id="chart_div" style="width: 900px; height: 500px;"></div>	
	</div>
</body>
</html>
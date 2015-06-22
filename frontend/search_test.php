<?php

$partial = $_GET['partial'];

$username = "applicationrx";
$password = "applicationrx";
$hostname = "localhost";

$dbhandle = mysql_connect($hostname, $username, $password)
 or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";

$selected = mysql_select_db("applicationrx",$dbhandle)
  or die("Could not select database");

$result = mysql_query("SELECT reaction from reactions where reaction like '" . $partial . "%' order by reaction");

$results = array();
while ($row = mysql_fetch_array($result)) {
   $results[] = $row{'reaction'};
}
//close the connection
mysql_close($dbhandle);

echo json_encode($results);

?>

<?php

// We will use PDO to execute database stuff. 
// This will return the connection to the database and set the parameter
// to tell PDO to raise errors when something bad happens
function getDbConnection() {
	
	/*$dbhandle = mysql_connect(DB_SERVER, DB_USER, DB_PASSWORD)
	or die("Unable to connect to MySQL");
	echo "Connected to MySQL<br>";
	
	return $dbhandle;*/
	
  $db = new PDO(DB_DRIVER . ":dbname=" . DB_DATABASE . ";host=" . DB_SERVER . ";charset=utf8", DB_USER, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
  return $db;
}

// This is the 'search' function that will return all possible rows starting with the keyword sent by the user
function serachForKeyword($keyword) {
  
/*	$dbhandle = getDbConnection();
	
	$selected = mysql_select_db("applicationrx",$dbhandle)
	or die("Could not select database");
	
	$result = mysql_query("SELECT reaction from reactions where reaction like '" . $keyword . "%' order by reaction");
	
	$results = array();
	
	$i=0;
	
	while ($row = mysql_fetch_array($result)) {
		$results[$i] = $row{'reaction'};
		$i++;
	}*/
	
    $db = getDbConnection();
    
    //$stmt = $db->prepare("SELECT name_en as country FROM `countries` WHERE name_en LIKE ? ORDER BY country");
    $stmt = $db->prepare("SELECT reaction from reactions where reaction like ? ORDER BY reaction");

    $keyword = '%' . $keyword . '%';
    $stmt->bindParam(1, $keyword, PDO::PARAM_STR, 100);

    $isQueryOk = $stmt->execute();
  
    $results = array();
    
    if ($isQueryOk) {
        $results = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } else {
      trigger_error('Error executing statement.', E_USER_ERROR);
    }

    $db = null;

    return $results;
}
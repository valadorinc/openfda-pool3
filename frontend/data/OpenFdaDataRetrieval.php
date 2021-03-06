<?php
require('../config/constant.php');

if (!isset($_GET['type'])) {
	die("");
}

if (!isset($_GET['keyword'])) {
	die("");
}

$type = $_GET['type'];
$keyword = $_GET['keyword'];

$type = strip_tags($type);
$type = htmlspecialchars($type);
$keyword = strip_tags($keyword);
$keyword = htmlspecialchars($keyword);
$keyword = rawurlencode($keyword);

if($type == "reaction") {
	$url = API_SERVICE_BASE_URL . API_KEY . '/search/reaction/' . $keyword;
}
else if($type == "drugInfo") {
	$url = API_SERVICE_BASE_URL . API_KEY . '/druginfo/' . $keyword;
}
else if($type == "drugChart"){
	$url = API_SERVICE_BASE_URL . API_KEY . '/chart/drugs/' . $keyword;
}
else if($type == "reactionChart"){
	$url = API_SERVICE_BASE_URL . API_KEY . '/chart/reactions/' . $keyword;
}
else { //$type == "drug"
	$url = API_SERVICE_BASE_URL . API_KEY . '/search/drug/' . $keyword;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
//take the raw output and convert it into a json object
$data = json_decode($output);
//Now that it's a json object we check the status code. 0 means success.
$StatusCode = $data->StatusCode;
if ($StatusCode == "0"){
	// if the call was successful there will be a 'body' containing all the data. In this case i just created an array with the results which we pull from the body.
	$body = $data->Body;
	
	if($type == "reaction") {
		//$results = $body->ReportOutput->drugs;
		$results = $body->ReportOutput;
	}
	else if($type == "drugInfo") {
		$results = $body;
	}
	else if($type == "reactionChart") {
		$results = $body;
		
	}else if($type == "drugChart") {
		$results = $body;
	}
	else {
		$results = $body->ReportOutput;
	}

	echo json_encode($results);
}


//////////////////////////////////////////////////////////////////

/*QQQQQ$url="http://localhost/ApplicationRx/services/openfdaservice.php?method=fda&format=json";
$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$result=curl_exec($ch);
curl_close($ch);

$resultStr1 = '<p>' . $result . '</p>';
$json_object = json_decode($result);

$json_arr = $json_object->data;
$arr = json_decode($json_arr);
//var_dump($arr);


//   echo $json_arr;

$resultStr2 = '';

foreach($arr as $json){
	$key = $json[0];
	$val = $json[1];
	$resultStr2 .= $key . ': ' . $val .'<br>';
}

echo json_encode($resultStr2, JSON_HEX_APOS);

//$contents = str_replace('{RESULT1}', $resultStr1, $contents);
//$contents = str_replace('{RESULT2}', $resultStr2, $contents);QQQQQ*/

?>
<?php

$url = 'http://52.4.127.22:8080/openfda/service/fda/lookup/reactions';
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
	$results = $body->results;
	//echo '<p>' . json_encode($results) . '</p>';
	echo json_encode($results, JSON_HEX_APOS);
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
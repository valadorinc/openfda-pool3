
<!-- $contents = file_get_contents('index.html'); -->
<!-- echo $contents; -->

<!DOCTYPE html>
<html>
<head>
    <title>ApplicationRx With Bootstrap and Angular JS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/styles.css" rel="stylesheet" media="screen">
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
    <!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> -->
    <script src="js/RetrieveData.js"></script>
    <script src="js/auto-complete.js"></script>
</head>
<body>
    <h1>ApplicationRx</h1>

    <!-- <form method="POST" action="data/OpenFdaDataRetrieval.php"> -->
    <form>
  	    <input type="text" value="" placeholder="Search" id="keyword" name="keyword" list="datalist"><input id="submit" type="submit" value="Submit">
  	</form>
	
  	<div id="results"></div>	    
  	<div id="openfdaresults"></div>
		
		<!-- <h1>Bing Search Tester (Basic)</h1>
		<form method="POST" action="bing_basic.php">
				<label for="service_op">Service Operation</label><br/>
				<input name="service_op" type="radio" value="Web" CHECKED /> Web <input name="service_op" type="radio" value="Image" /> Image <br/>
						<label for="query">Query</label><br/>
						<input name="query" type="text" size="60" maxlength="60" value="" /><br /><br />
								<input name="bt_search" type="submit" value="Search" />
        </form> -->

        <!-- <h2>Result 1</h2>
        {RESULT1}

        <h2>Result 2</h2>
        {RESULT2} -->

</body>
</html>


<!-- $contents = file_get_contents('index.html'); -->
<!-- echo $contents; -->

<!DOCTYPE html>
<html ng-app="mainModule">
<head>
    <title>ApplicationRx With Bootstrap and Angular JS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/styles.css" rel="stylesheet" media="screen">
    
    <!-- --------------------------------------------------- -->
<!-- <style>
	table, th , td  {
	  border: 1px solid grey;
	  border-collapse: collapse;
	  padding: 5px;
	}
	table tr:nth-child(odd)	{
	  background-color: #f1f1f1;
	}
	table tr:nth-child(even) {
	  background-color: #ffffff;
	}
	</style> -->
    <!-- --------------------------------------------------- -->
    
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <!-- <link rel="stylesheet" href="/resources/demos/style.css"> -->
  <style>
  .ui-autocomplete-loading {
    background: white url("images/ui-anim_basic_16x16.gif") right center no-repeat;
  }
  #keyword { width: 25em; }
  </style>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-resource.min.js">
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-route.min.js">
   </script>
    <!-- <script src="js/Chart.min.js"></script> -->
    <!-- <script src="js/angular-chart.js"></script> -->
    <script src="js/RetrieveData.js"></script>
    <script src="js/auto-complete.js"></script>
    <!--  <script src="js/test.js"></script> -->
   
</head>
<!-- <body ng-app="mainModule"> -->
<body ng-app="examples" id="top" class="ng-scope" data-twttr-rendered="true">
 	
    <div ng-controller="mainController" class="ng-scope">
        <h3>1. Click</h3>
        <button id="firstBtn" ng-click="onSubmitBtnClick()">Click me</button>
    </div>
  	
<div class="container">
  <div class="text-center">
  <h1>appRX</h1>
  </div>
  <div class="jumbotron">
    <input type="text" value="" placeholder="Search" id="keyword" name="keyword">
  	<div id="results"></div>
  
  <h2>Image</h2>
  <p>The .img-responsive class makes the image scale nicely to the parent element (resize the browser window to see the effect):</p>                  
  <img src="images/cinqueterre.jpg" class="img-responsive img-circle" alt="Cinque Terre" width="304" height="236">
  
  <a href="#" class="btn btn-info btn-lg"><span class="glyphicon glyphicon-search"></span></a>

  <div class="table-responsive">          
      <table class="table" id="records_table">
      </table>
  </div>
</div>

</div>

<!-- <div class="col-lg-6 col-sm-12 ng-scope" id="line-chart" ng-controller="LineCtrl">
    <div class="panel panel-default">
        <div class="panel-heading">Line Chart</div>
        <div class="panel-body">
            <div class="chart-container"><canvas id="line" class="chart chart-line ng-isolate-scope" data="data" labels="labels" legend="true" click="onClick" hover="onHover" series="series" height="391" width="784" style="width: 523px; height: 261px;"></canvas><chart-legend><ul class="line-legend"><li><span style="background-color:rgba(151,187,205,1)"></span>Series C</li><li><span style="background-color:rgba(220,220,220,1)"></span>Series D</li></ul></chart-legend></div>
        </div>
    </div>
</div> -->

</body>
</html>

<!DOCTYPE html>
<html ng-app="mainModule">
<head>
    <title>ApplicationRx With Bootstrap and Angular JS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/styles.css" rel="stylesheet" media="screen">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
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
 	
    <div ng-controller="drugController" class="ng-scope">
        <h3>1. Search Drug(s)</h3>
        <button id="drugBtn" ng-click="onDrugSearch()">Click me</button>
    </div>
    
    <div ng-controller="reactionController" class="ng-scope">
        <h3>2. Search Reaction(s)</h3>
        <button id="reactionBtn" ng-click="onReactionSearch()">Click me</button>
    </div>
  	
<div class="container-fluid">
    <div class="row">

      <div class="col-md-4"> </div>
      <div class="col-md-4"> 
        <div class="selection">
          <a href="#search-drug" class="select-drug" data-toggle="tab"></a>
          <a href="#search-reaction" class="select-reaction" data-toggle="tab"></a>
        </div>
        
        <div class="tab-content">
        
          <form id="search-drug" class="tab-pane search-form active">
            <div>
              <input type="text" id="drugKeyword" class="form-control input-lg" placeholder="Drug Name">             
              <!-- <span class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
              </span> -->
            </div>
            
            <div class="text-center add-field"><a href="#">+</a></div>
          
	        <div id="drug_table_div" class="table-responsive table-bordered table-stripped">          
	            <table class="table" id="drug_table"></table>
	        </div>
            
          </form>
      
          <form id="search-reaction" class="tab-pane search-form">
            <div>
              <input type="text" id="reactionKeyword" class="form-control input-lg" placeholder="Adverse Reaction">
              <!-- <span class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
              </span> -->
            </div>
        
            <div class="text-center add-field"><a href="#">+</a></div>

	        <div id="reaction_table_div" class="table-responsive table-bordered table-stripped">          
	            <table class="table" id="reaction_table"></table>
	        </div>
            
          </form>

        </div>
        
        <div class="text-right">
          <h3><span class="label label-info"><a href="#">?</a></span></h3>
        </div>

      </div>
      <div class="col-md-4"> </div>
    </div>

    </div>

</body>
</html>

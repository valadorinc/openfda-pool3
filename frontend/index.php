
<!-- $contents = file_get_contents('index.html'); -->
<!-- echo $contents; -->

<!DOCTYPE html>
<html ng-app="mainModule">
<head>
    <title>ApplicationRx With Bootstrap and Angular JS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/styles.css" rel="stylesheet" media="screen">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    
<style type="text/css">
      body {
        background: white;
        font-family: Helvetica, Arial, sans-serif;
      }
      
      h1 {
        font-size: 72px;
      }
      
      h1 a {
        color: #999;
      }
      
      .selection {
        height: 98px;
        background-image: url(images/selection.png);
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .select-drug,
      .select-reaction {
        width: 50%;
        height: 98px;
        float: left;
        text-indent: -133337px;
      }
      
      .search-form {
        border-radius: 10px;
        padding: 20px;
      }

      #search-drug {
        background: #15489a;
      }
      
      #search-reaction {
        background: #6fabdd;
      }
      
      .add-field {
        font-size: 64px;
      }
      
      .add-field a,
      .label-info a {
        color: white;
      }
      
    </style>
    
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
  	
<div class="container-fluid">
    <div class="row">

      <div class="col-md-4"> </div>
      <div class="col-md-4"> 
        <div class="selection">
          <a href="#search-drug" class="select-drug" data-toggle="tab">Drug</a>
          <a href="#search-reaction" class="select-reaction" data-toggle="tab">Reaction</a>
        </div>
        
        <div class="tab-content">
        
          <form id="search-drug" class="tab-pane search-form active">
            <div>
              <input type="text" id="keyword" class="form-control input-lg" placeholder="Drug Name">             
              <!-- <span class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
              </span> -->
            </div>
            
            <div class="text-center add-field"><a href="#">+</a></div>
          
	        <div id="records_table_div" class="table-responsive table-bordered table-stripped">          
	            <table class="table" id="records_table"></table>
	        </div>
            
          </form>
      
          <form id="search-reaction" class="tab-pane search-form">
            <div>
              <input type="text" class="form-control input-lg" placeholder="Adverse Reaction">
              <!-- <span class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
              </span> -->
            </div>
        
            <div class="text-center add-field"><a href="#">+</a></div>

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

<!DOCTYPE html>
<html ng-app="mainModule">
<head>
    <title>ApplicationRx With Bootstrap and Angular JS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/styles.css" rel="stylesheet" media="screen">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">   
    <link href="css/jquery-ui.min-1.9.2.css" rel="stylesheet" media="screen">
    <link href="css/autocomplete-deluxe.css" rel="stylesheet" media="screen">
    
    <style>
    .ui-autocomplete-loading {
        background: white url("images/ui-anim_basic_16x16.gif") right center no-repeat;
    }
    </style>

    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-ui.min-1.9.2.js"></script>    
    <script src="js/bootstrap.min.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/RetrieveData.js"></script>
    <script src="js/autocomplete-deluxe.js"></script>
    <script src="js/autocomplete.js"></script>
   
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
        
        <div class="tab-content radius-all template-bg">
                    
          <form id="search-drug" class="tab-pane search-form active gradient-drug-search">
          
            <div>
              <input type="text" id="drugKeyword" class="form-control input-lg" placeholder="Drug Name">
            </div>
            
			<div id="drug-input-control" class="autocomplete-container autocomplete-multiple">
			    <div class="form-type-textfield form-item-field-keywords-und-value-field form-item form-group input-lg">
				    <input placeholder="Drug Name" class="autocomplete-form form-control form-text jquery-once-2-processed ui-autocomplete-input autocomplete-multiple ui-autocomplete-loading" id="autocomplete-input-drug" style="width: 85px;" type="text" name="drug" value="" size="60" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
		        </div>
		    </div>              
            
            <div class="text-center add-field"><a href="#">+</a></div>
          
	        <div id="drug_table_div" class="table-responsive table-bordered table-stripped">          
	            <table class="table" id="drug_table"></table>
	        </div>
            
          </form>
      
          <form id="search-reaction" class="tab-pane search-form gradient-reaction-search">
            <div>
              <input type="text" id="reactionKeyword" class="form-control input-lg" placeholder="Adverse Reaction">
            </div>
              
		    <div id="reaction-input-control" class="autocomplete-container autocomplete-multiple">
			    <div class="form-type-textfield form-item-field-keywords-und-value-field form-item form-group input-lg">
			        <input placeholder="Adverse Reaction" class="autocomplete-form form-control form-text jquery-once-2-processed ui-autocomplete-input autocomplete-multiple ui-autocomplete-loading" id="autocomplete-input-reaction" style="width: 125px;" type="text" name="reaction" value="" size="60" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
			    </div>
	        </div>              
        
            <div class="text-center add-field"><a href="#">+</a></div>

	        <div id="reaction_table_div" class="table-responsive table-bordered table-stripped">          
	            <table class="table" id="reaction_table"></table>
	        </div>
            
            <div id="drug-info"></div>
            
          </form>

        </div>

      </div>
      <div class="col-md-4"> </div>
      
    </div>
    </div>

</body>
</html>

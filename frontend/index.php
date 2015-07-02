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
    <script src="js/general.js"></script>
   <!-- google chart -->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <!-- google chart end -->
    
    <!-- bootstrap gallery -->
    <script src="js/photo-gallery.js"></script>
    <!-- bootstrap gallery end -->
   
   
</head>
<!-- <body ng-app="mainModule"> -->
<body ng-app="examples" id="top" class="ng-scope" data-twttr-rendered="true">
 	
<!--    <div ng-controller="drugController" class="ng-scope">
        <h3>1. Search Drug(s)</h3>
        <button id="drugBtn" ng-click="onDrugSearch()">Click me</button>
    </div>
    
    <div ng-controller="reactionController" class="ng-scope">
        <h3>2. Search Reaction(s)</h3>
        <button id="reactionBtn" ng-click="onReactionSearch()">Click me</button>
    </div> -->
 
<header>
    <h1 class="text-center"><a href="#">appRX</a></h1>
</header>
   
<div class="container-fluid">
    
    <div class="row">

      <div class="col-md-4"></div> 
      
      <div class="col-md-4">
      
          <ul class="nav nav-pills">
		      <li class="active text-center" style="width:50%;"><a id="drugTab" data-toggle="pill" href="#search-drug">DRUG</a></li>
		      <li class="text-center" style="width:49%;"><a id="reactionTab" data-toggle="pill" href="#search-reaction">ADVERSE REACTION</a></li>
		  </ul>
		  
		  <div id="drug-reaction-tab-container" class="tab-content gradient-drug-search">
		      <form id="search-drug" class="tab-pane search-form active">
			      <div id="drug-input-control" class="autocomplete-container autocomplete-multiple">
			          <div class="form-type-textfield form-item-field-keywords-und-value-field form-item form-group input-lg">
				          <input placeholder="Drug Name" class="autocomplete-form form-control form-text jquery-once-2-processed ui-autocomplete-input autocomplete-multiple ui-autocomplete-loading" id="autocomplete-input-drug" style="width: 85px;" type="text" name="drug" value="" size="60" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
		              </div>
		          </div>
		          
		          <div id="result1"></div>

                  <div id="drug_stat_div"></div>
			      <div id="btnDiv1" ng-controller="btnController" class="ng-scope" style="display:none;">
	                  </br>       	
	        	      <div id="statBtn">
	        		      <button id="statBtn" ng-click="displayDrugStat()">Statistic</button>
	        	      </div>	
	        	      <div>
            		      <button id="resetBtn1" ng-click="reset('drug')">Reset</button>
            	      </div>
                  </div>
		      </form>
		      
		      <form id="search-reaction" class="tab-pane search-form">             
		          <div id="reaction-input-control" class="autocomplete-container autocomplete-multiple">
			          <div class="form-type-textfield form-item-field-keywords-und-value-field form-item form-group input-lg">
			              <input placeholder="Adverse Reaction" class="autocomplete-form form-control form-text jquery-once-2-processed ui-autocomplete-input autocomplete-multiple ui-autocomplete-loading" id="autocomplete-input-reaction" style="width: 125px;" type="text" name="reaction" value="" size="60" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
			          </div>
	              </div>              
       
                  <div id="result2"></div>
                   
                  <div id="drug-info" class="container"></div>
			      <div id="reaction_stat_div"></div>
			      <div id="btnDiv2" ng-controller="btnController" class="ng-scope" style="display:none;">	
                      </br>        	
	        	      <div id="statBtn">
	        		      <button id="statBtn" ng-click="displayReactionStat()">Statistic</button>
	        	      </div>	
	        	      <!-- <div id="resetBtn"> -->
	        	      <div>
            		      <button id="resetBtn2" ng-click="reset('reaction')">Reset</button>
            	      </div>
                  </div>
              </form>
		  </div>
      </div>
      <div class="col-md-4"> </div>      
    </div>
</div>
</body>
</html>

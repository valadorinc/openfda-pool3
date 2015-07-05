<!DOCTYPE html>
<html ng-app="mainModule">
<head>
    <title>ReactionRX</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

    <link href="css/styles.css" rel="stylesheet" media="screen">

   <!-- google chart -->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <!-- google chart end -->
    
    <!-- bootstrap gallery -->
    <script src="js/photo-gallery.js"></script>
    <!-- bootstrap gallery end -->
   
   
</head>
<!-- <body ng-app="mainModule"> -->
<body ng-app="examples" id="top" class="ng-scope" data-twttr-rendered="true">
 
<header>
	<div id="title" ng-controller="titleController" class="ng-scope" title="About Reaction Rx">
    	<h1><a ng-click="displayAbout()">Reaction RX</a></h1>
    </div>
</header>
<div id="about" class="about-dialog" title="About ReactionRX"></div>   
<div class="container-fluid">
    
    <div class="row">

      <div class="col-md-3"></div> 
      
      <div class="col-md-6">
      
          <ul class="nav nav-pills nav-pills-justified">
		      <li class="active text-center"><a id="drugTab" data-toggle="pill" href="#search-drug">DRUG</a></li>
		      <li class="text-center"><a id="reactionTab" data-toggle="pill" href="#search-reaction">ADVERSE REACTION</a></li>
		  </ul>
		  
		  <div id="drug-reaction-tab-container" class="tab-content gradient-drug-search">
		      <form id="search-drug" class="tab-pane search-form active">
			      <div id="drug-input-control" class="autocomplete-container autocomplete-multiple">
			          <div class="form-type-textfield form-item-field-keywords-und-value-field form-item form-group input-lg">
				          <input placeholder="Drug Name" class="autocomplete-form form-control form-text jquery-once-2-processed ui-autocomplete-input autocomplete-multiple ui-autocomplete-loading" id="autocomplete-input-drug" style="width: 85px;" type="text" name="drug" value="" size="60" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
		              </div>
		          </div>
		          
		          <div id="result1"></div>

                  <div id="drug_stat_div" title = "Drug Statistics Graph"></div>
			      <div id="btnDiv1" ng-controller="btnController" class="ng-scope" style="display:none;">
	                  </br>       	
	        	      <div id="statBtn">
	        	      	  <!--  ng-click="displayDrugStat()" -->
	        		      <button id="statBtn" ng-click="displayDrugStat()" class="drug-btn enabled">Statistics</button>
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
                   
                  <div id="drug-info" class="row"></div>
                  
			      <div id="reaction_stat_div" title="Reaction Statistics Graph"></div>
			      <div tabindex="-1" id="myModal" class="jq-dialog" title="Drug Information from DailyMed" aria-hidden="false"></div>
			      <div id="btnDiv2" ng-controller="btnController" class="ng-scope" style="display:none;">	
                      </br>        	
	        	      <div id="statBtn">
	        		      <button id="statBtn" ng-click="displayReactionStat()" class="reaction-btn enabled" >Statistics</button>
	        	      </div>	
	        	      <div>
            		      <button id="resetBtn2" ng-click="reset('reaction')">Reset</button>
            	      </div>
                  </div>
              </form>
		  </div>
      </div>
      <div class="col-md-3"> </div>      
    </div>
</div>
</body>
</html>

$( document ).ready(function() {
	
	$( "#autocomplete-input-drug" ).click(function(e) {
		
		if(e.originalEvent == undefined) {
			$('#drug-reaction-tab-container').removeClass('gradient-drug-search');
						
			e.preventDefault();
		    var keywordArr = new Array();  
			    
		    $('#drug-input-control').children('.autocomplete-item').each(function () {
		    	var value = this.textContent || this.innerText || getText( this );		    	
		    	keywordArr.push(value);
		    });
			    
		    keyword = keywordArr.join("~");
			    
		    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'drug'}).
		      success(function(response) {
			      response = JSON.parse(response);
			      
			      if(response.cols[0] == undefined && response.cols[1] == undefined) {
				      $('#result1').empty();
				      $('#result1').append("No Results");
				      $('#btnDiv1').show(); 
			      }
			      else {
				      $(function() {				    		
					      var table_results = '<div id="drug_table_div" class="table-responsive table-bordered table-stripped">';
					      table_results += '<table class="table rx-table" id="drug_table">';
					      table_results += '<thead><tr><th>' + response.cols[0] + '</th><th>' +  response.cols[1] + '</th></tr></thead>'
					    					    				    		
					      $.each(response.rows, function(i, item) {			    	    	
					          table_results += '<tr><td>' + item[0] + '</td><td>' + item[1] + '</td></tr>'
					      });
					    		
					      table_results += '</table>';
					      table_results += '</div>';
					    		
					      $('#result1').empty();
					      $('#result1').append(table_results);
					      $('#btnDiv1').show();
					  });
			      }
			      
			      
			  }).
			  error(function(error) {
			      //alert('error');
			  });
		  }
	});
	
	$( "#autocomplete-input-reaction" ).click(function(e) {
		
		if(e.originalEvent == undefined) {
		
			$('#drug-reaction-tab-container').removeClass('gradient-reaction-search'); //QQQQQ
			
			var code = event.keyCode || event.which;
		
			e.preventDefault();
		    var keywordArr = new Array();  
		    
		    $('#reaction-input-control').children('.autocomplete-item').each(function () {
		    	var value = this.textContent || this.innerText || getText( this );		    	
		    	keywordArr.push(value);
		    });
		    
		    keyword = keywordArr.join("~");
		    
		    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'reaction'}).
		      success(function(response) {
			    	response = JSON.parse(response);
			    	
			    	if(response.cols[0] == undefined && response.cols[1] == undefined) {
			    		$('#result2').empty();
			    		$('#result2').append('No Results');
			    		$('#btnDiv2').show();
			    	}
			    	else {
				    	$(function() {
				    		var table_results = '<div id="reaction_table_div" class="table-responsive table-bordered table-stripped">';
				    		table_results += '<table class="table rx-table" id="reaction_table">';
				    		table_results += '<thead><tr><th>' + response.cols[0] + '</th><th>' +  response.cols[1] + '</th></tr></thead>'
				    					    				    		
				    	    $.each(response.rows, function(i, item) {
				    	    	item[0] = item[0].replace(/(['"])/g, "\\$1");
				    	    	
				    	    	var link = "<div id='myDiv' onClick='drugLabelsDisplay(\"" + item[0] + "\")'><span>" + item[0] + "</span></div>";
				    	    	table_results += "<tr><td>" + link + "</td><td>" + item[1] +  "</td></tr>";			    	    	
				    	    });
				    		
				    		$('#result2').empty();
				    		$('#result2').append(table_results);
				    		$('#btnDiv2').show();
				    	});
			    	}
		      }).
		      error(function(error) {
		    	  //alert('error');
		      });
		}
	});
	
});
    
var app = angular.module("mainModule", []);

function drugLabelsDisplay(drugName) {
	//alert(link);
	
	var keyword = drugName;
	
    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'drugInfo'}).
    success(function(response) {
	    	response = JSON.parse(response);
	    	
	    	$(function() {
	    		$('#reaction_table_div').hide();
	    		
	    	    $.each(response.DrugInfo, function(i, item) {
	    	    	if (i != 'images'){
	    	    		i = i.replace(/_/g, " ");
	    	    		item = item.replace(/([\[\]'"])/g, "");
	    	    		if(item != ""){
	    	    			$('#drug-info').append('<p>' + i + ': ' + item + '</p>');
	    	    		}
	    	    		else {
	    	    			$('#drug-info').append('<p>' + i + ':  N/A!</p>');
	    	    		}
	    	    	} 	
	    	    });
	    	    //$('#drug-info').append('<div tabindex="-1" id="myModal" aria-hidden="false"></div>');
	    	    //$('#drug-info').append('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">');
	    	    
	    	    //$('#drug-info').append('<div id="myModal"></div>'); //QQQQQ

	    	    var images ="";

	    	    $.each(response.DrugInfo.images, function(i, item) {
	    	    	images += '<li id="bg-li"><img id="bg-img" src="' + item + '" class="img-rounded img-responsive" alt="Cinque Terre" width="100" height="100"></li>';
	    	    	
	    	    	//$('#drug-info').append('<li id="bg-li"><img id="bg-img" src="' + item + '" class="img-rounded img-responsive" alt="Cinque Terre" width="100" height="100"></li>');
	    	    });
	    	    
	    	    $image = $('<ul class="row">').append($(images));
	    	    $('#drug-info').append($image);
	    	    
	    	    $('li img').on('click',function(){
    	    		var src = $(this).attr('src');
    	    		var img = '<img src="' + src + '" class="img-responsive"/>';
    	    		
    	    		//start of new code new code
    	    		var arrayIndex = $(this).parent('li').index();   
    	    		
    	    		var totalArray = $('ul.row li').length;
    	    		
    	    		var html = '';
    	    		html += img;                
    	    		html += '<div style="height:25px;clear:both;display:block;">';
    	    		html += '<a class="controls previous" href="' + (arrayIndex-1) + '">&laquo; prev</a>';
    	    		html += '<a class="controls next" href="'+ (arrayIndex+1) + '">next &raquo;</a>';
    	    		html += '</div>';
    	    		
    	    		$('#myModal').dialog({
    	    			maxWidth:600,
    	    	        maxHeight: 500,
    	    	        width: 600,
    	    	        height: 500,
    	    	        modal: true,
    	    			overlay: {
    	    				opacity: 0.5,
    	    				background: "black"
    	    			}
    	    		});
    	    		
    	    		if($("#myModal").dialog( "isOpen" )){
    	    			document.getElementById("myModal").innerHTML = html;
    	    			//new code
    	    			$('a.controls').trigger('click');
    	    			
    	    		}
    	    		
    	    		if(!($("#myModal").dialog( "isOpen" ))){
    	    			document.getElementById("myModal").innerHTML = '';
    	    		}
    	    		
    	    		
    	    		if (arrayIndex == 0) {
    	    			$('a.previous').hide();
    	    		}
    	    		
    	    		if(arrayIndex+1 == totalArray) {
    	    			$('a.next').hide();
    	    		} 	    			
    	       });
	    	    
	    	    
	    	    $(document).on('click', '.ui-icon-closethick', function(){
	    	    	//alert("x");
	    	    	$('#myModal .modal-body').html('');
	    	    });
	    	    
	    	    
	    	    
	    	    $(document).on('click', 'a.controls', function(){
	    	    	
	    	    	var indexNext = $('#myModal .next').attr('href');
	    	    	var indexPrevious = $('#myModal .previous').attr('href');
	    	    	
	    	    	var index = indexNext;
	    	    	var src = $('ul.row li:nth-child('+ index +') img').attr('src');             
	    	    	
	    	    	$('#myModal img').attr('src', src);	    	    	
	    	    	
	    	    	if($(this).hasClass('previous')){
	    	    		
	    	    		$(this).attr('href', index-2); 
	    	    		$('a.next').attr('href', index);
	    	    	}else{	
	    	    		$(this).attr('href', index); 
	    	    		$('a.previous').attr('href', index-2);
	    	    	}
	    	    	
	    	    	
	    	    	var total = $('ul.row li').length; 
	    	    	
	    	    	//hide next button
	    	    	if(total <= indexNext){
	    	    		$('a.next').hide();
	    	    	}else{
	    	    		$('a.next').show();
	    	    	}            
	    	    	//hide previous button
	    	    	if(indexPrevious < 0){
	    	    		$('a.previous').hide();
	    	    	}else{
	    	    		$('a.previous').show();
	    	    	}
	    	    	
	    	    	
	    	    	
	    	    	return false;
	    	    });
	    	    //YYYYY
	    	});
    }).
    error(function(error) {
  	  //alert('error');
    });
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
function getText( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

app.controller("btnController", function($scope) {
	$scope.reset = function (type) {

		if(type == 'drug') {
			$('#result1').empty();
			$('span.autocomplete-item').remove();
			$('#drug_stat_div').empty();
			$('#autocomplete-input-drug').focus();
			$('#drug-reaction-tab-container').addClass('gradient-drug-search').removeClass('gradient-reaction-search');
			$('#btnDiv1').hide();
		}
		
		if(type == 'reaction') {
			$('#result2').empty();
			$('span.autocomplete-item').remove();
			$('#reaction_stat_div').empty();
			$('#drug-info').empty();
			$('#autocomplete-input-reaction').focus();
			$('#drug-reaction-tab-container').addClass('gradient-reaction-search').removeClass('gradient-drug-search');
			$('#btnDiv2').hide();
		}
	};
	
	$scope.displayDrugStat = function () {		
		
		var keywordArr = new Array();  
	    
	    $('#drug-input-control').children('.autocomplete-item').each(function () {
	    	var value = this.textContent || this.innerText || getText( this );		    	
	    	keywordArr.push(value);
	    });
	    
	    keyword = keywordArr.join("~");
	    //keyword = keywordArr[0];
	    //keyword = keyword.replace(" ", "+");

	    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'drugChart'}).
	      success(function(response) {
		    	response = JSON.parse(response);
		    	
		    	
		    	setTimeout(function(){
			    	google.load('visualization', '1', {
			    		packages: ['corechart'],
			    		callback: function() {
			    			var jsonData = response.chartdata;
							var data = google.visualization.arrayToDataTable(jsonData);
							
							$('#drug_stat_div').dialog({
								maxWidth:800,
						        maxHeight: 750,
						        width: 750,
						        height: 700,
						        modal: true,
								overlay: {
									opacity: 0.5,
									background: "black"
								}
							});
							
							if($("#drug_stat_div").dialog( "isOpen" )){
								//document.getElementById("about").innerHTML = "<p>Disclaimer: ReactionRX is intended to provide helpful drug and health information for the general public based on data from openFDA. It is made available with the understanding that Valador Inc., the author of the ReactionRX Content, and openFDA are not engaged in rendering medical, health, psychological, or any other kind of personal professional services on this site. The ReactionRX Content should not be considered complete, and does not cover all diseases, ailments, physical conditions or their treatment. It should not be used in place of a call or visit to a medical, health or other competent professional, who should be consulted before adopting any of the suggestions on this site or before drawing any inferences from the ReactionRX Content.</p>";
								var chart = new google.visualization.ColumnChart(document.getElementById("drug_stat_div"));
								var options = {
										title: 'Count vs Age',
										width: "100%"
									};
								chart.draw(data, options);
							}
							else {
								document.getElementById("drug_stat_div").innerHTML = "";
							}
			    		}
			        });
			    });
	      }).
	      error(function(error) {
	    	  //alert('error');
	      });
	};	
	

	$scope.displayReactionStat = function () {
		
		var keywordArr = new Array();  
	    
	    $('#reaction-input-control').children('.autocomplete-item').each(function () {
	    	var value = this.textContent || this.innerText || getText( this );		    	
	    	keywordArr.push(value);
	    });
	    
	    keyword = keywordArr.join("~");
	    //keyword = keywordArr[0];

	    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'reactionChart'}).
	      success(function(response) {
		    	response = JSON.parse(response);
		    	
		    	
		    	setTimeout(function(){
			    	google.load('visualization', '1', {
			    		packages: ['corechart'],
			    		callback: function() {
			    			
			    			var jsonData = response.chartdata;
							var data = google.visualization.arrayToDataTable(jsonData);
							
							$('#reaction_stat_div').dialog({
								maxWidth:800,
						        maxHeight: 750,
						        width: 750,
						        height: 700,
						        modal: true,
								overlay: {
									opacity: 0.5,
									background: "black"
								}
							});
							
							if($("#reaction_stat_div").dialog( "isOpen" )){
								var chart = new google.visualization.ColumnChart(document.getElementById("reaction_stat_div"));
								var options = {
										title: 'Count vs Age',
										width: "100%"
									};
								chart.draw(data, options);
							}
							else {
								document.getElementById("reaction_stat_div").innerHTML = "";
							}
			    		}
			        });
			    });
	      }).
	      error(function(error) {
	    	  //alert('error');
	      });
	};
});

app.controller("titleController", function($scope) {
	$scope.displayAbout = function () {
		
		$('#about').dialog({
			maxWidth:600,
	        maxHeight: 400,
	        width: 600,
	        height: 350,
	        modal: true,
			overlay: {
				opacity: 0.5,
				background: "black"
			}
		});
		
		if($("#about").dialog( "isOpen" )){
			document.getElementById("about").innerHTML = "<p>Disclaimer: ReactionRX is intended to provide helpful drug and health information for the general public based on data from openFDA. It is made available with the understanding that Valador Inc., the author of the ReactionRX Content, and openFDA are not engaged in rendering medical, health, psychological, or any other kind of personal professional services on this site. The ReactionRX Content should not be considered complete, and does not cover all diseases, ailments, physical conditions or their treatment. It should not be used in place of a call or visit to a medical, health or other competent professional, who should be consulted before adopting any of the suggestions on this site or before drawing any inferences from the ReactionRX Content.</p>";
		}
		else {
			document.getElementById("about").innerHTML = "";
		}
		
	};
});


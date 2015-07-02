$( document ).ready(function() {
	
	$( "#autocomplete-input-drug" ).click(function(e) {
		
		if(e.originalEvent == undefined) {
			$('#drug-reaction-tab-container').removeClass('gradient-drug-search');
			
			var code = event.keyCode || event.which;
			
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
			    	
			    	$(function() {				    		
				    		var table_results = '<div id="drug_table_div" class="table-responsive table-bordered table-stripped">';
				    		table_results += '<table class="table" id="drug_table">';
				    		table_results += '<thead><tr><th>' + response.cols[0] + '</th><th>' +  response.cols[1] + '</th></tr></thead>'
				    					    				    		
				    	    $.each(response.rows, function(i, item) {			    	    	
				    	    	table_results += '<tr><td>' + item[0] + '</td><td>' + item[1] + '</td></tr>'
				    	    });
				    		
				    		table_results += '</table>';
				    		table_results += '</div>';
				    		
				    		/*table_results += '<div id="btnDiv" ng-controller="btnController" class="ng-scope">';
				    		table_results += '<br/>';
				    		table_results += '<div id="statBtn">';
				    		table_results += '<button id="statBtn" ng-click="displayDrugStat()">Statistic</button>';
				    		table_results += '</div>';
				    	    table_results += '<div>';
				    		table_results += '<button id="resetBtn1" ng-click="reset(\"drug\")">Reset</button>';
				    		table_results += '</div>';
				    		table_results += '</div>';*/
				    		
				    		$('#result1').empty();
				    		$('#result1').append(table_results);
				    		$('#btnDiv1').show();
				    	});
			      }).
			      error(function(error) {
			    	  //alert('error');
			      });
		}
	});
	
	$( "#autocomplete-input-reaction" ).click(function(e) {
		
		if(e.originalEvent == undefined) {
		
			$('#drug-reaction-tab-container').removeClass('gradient-reaction-search');
			
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
			    	
			    	$(function() {
			    		var table_results = '<div id="reaction_table_div" class="table-responsive table-bordered table-stripped">';
			    		table_results += '<table class="table" id="reaction_table">';
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
	    	    		i = i.replace(/([_])/, " ");
	    	    		item = item.replace(/([\[\]'"])/g, "");
	    	    		if(item != ""){
	    	    			$('#drug-info').append('<p>' + i + ': ' + item + '</p>');
	    	    		}
	    	    		else {
	    	    			$('#drug-info').append('<p>' + i + ':  N/A!</p>');
	    	    		}
	    	    	} 	
	    	    });
	    	    
	    	    $('#drug-info').append('<div id="myModal"></div>');

	    	    var images ="";

	    	    $.each(response.DrugInfo.images, function(i, item) {
	    	    	images += '<li id="bg-li"><img id="bg-img" src="' + item + '" class="img-rounded img-responsive" alt="Cinque Terre" width="100" height="100"></li>';
	    	    	
	    	    	//$('#drug-info').append('<li id="bg-li"><img id="bg-img" src="' + item + '" class="img-rounded img-responsive" alt="Cinque Terre" width="100" height="100"></li>');
	    	    });
	    	    
	    	    $image = $('<ul>').append($(images));
	    	    $('#drug-info').append($image);
	    	    
	    	    $('li img').on('click',function(){
    	    		var src = $(this).attr('src');
    	    		var img = '<img src="' + src + '" class="img-responsive"/>';
    	    		
    	    		//start of new code new code
    	    		var index = $(this).parent('li').index();   
    	    		
    	    		var html = '';
    	    		html += img;                
    	    		html += '<div style="height:25px;clear:both;display:block;">';
    	    		html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
    	    		html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
    	    		html += '</div>';
    	    		
    	    		//$(function() {
    	    		    //$( "#dialog" ).dialog();
    	    		  //});
    	    		//$('#myModal').modal(); 
    	    		
    	    		$('#dialog').dialog(
    	    			"resize", "auto"
    	    		);
    	    		
    	    		$('#myModal').dialog();
    	    		
    	    		if($("#myModal").dialog( "isOpen" )){
    	    			document.getElementById("myModal").innerHTML = html;
    	    			//new code
    	    			$('a.controls').trigger('click');
    	    			
    	    		}
    	    		/*
    	    		$('#myModal').on('shown.bs.modal', function(){
    	    			$('#myModal .modal-body').html(html);
    	    			//new code
    	    			$('a.controls').trigger('click');
    	    		});
    	    		$('#myModal').on('hidden.bs.modal', function(){
    	    			$('#myModal .modal-body').html('');
    	    		});
    	    		*/
    	    			
    	       });
   
	    	    $(document).on('click', 'a.controls', function(){
	    	    	var index = $(this).attr('href');
	    	    	var src = $('ul.row li:nth-child('+ index +') img').attr('src');             
	    	    	
	    	    	$('.modal-body img').attr('src', src);
	    	    	
	    	    	var newPrevIndex = parseInt(index) - 1; 
	    	    	var newNextIndex = parseInt(newPrevIndex) + 2; 
	    	    	
	    	    	if($(this).hasClass('previous')){               
	    	    		$(this).attr('href', newPrevIndex); 
	    	    		$('a.next').attr('href', newNextIndex);
	    	    	}else{
	    	    		$(this).attr('href', newNextIndex); 
	    	    		$('a.previous').attr('href', newPrevIndex);
	    	    	}
	    	    	
	    	    	var total = $('ul.row li').length + 1; 
	    	    	//hide next button
	    	    	if(total === newNextIndex){
	    	    		$('a.next').hide();
	    	    	}else{
	    	    		$('a.next').show();
	    	    	}            
	    	    	//hide previous button
	    	    	if(newPrevIndex === 0){
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
			$('#autocomplete-input-drug').focus();
			$('#drug-reaction-tab-container').addClass('gradient-drug-search').removeClass('gradient-reaction-search');
			$('#btnDiv1').hide();
		}
		
		if(type == 'reaction') {
			$('#result2').empty();
			$('span.autocomplete-item').remove();
			$('#autocomplete-input-reaction').focus();
			$('#drug-reaction-tab-container').addClass('gradient-reaction-search').removeClass('gradient-drug-search');
			$('#btnDiv2').hide();
		}
	};
	
	$scope.displayDrugStat = function () {		

		//google.load("visualization", "1", {packages:["corechart"]});
		//google.setOnLoadCallback(drawChart);
		
		var keyword = $("#drugKeyword").val();
	    
	    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'drugChart'}).
	      success(function(response) {
		    	response = JSON.parse(response);
		    	/*
		    	$(function() {
		    		$('#drug_table_div').show();
		    		
	    	    	$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
	    	        $('#drug_table').append($thead);
		    		
		    	    $.each(response.rows, function(i, item) {
		    	    	$tr = $('<tr class="success">').append($('<td>').text(item[0]),$('<td>').text(item[1]));
		    	        $('#drug_table').append($tr);
		    	    });
		    	});
		    	*/
	      }).
	      error(function(error) {
	    	  //alert('error');
	      });
		
		
	    /*
		function drawChart() {
			var jsonData = [["Time","Count"],[0,14],[1,12],[2,28],[3,44],[4,71],[5,81],[6,129],[7,140],[8,132],[9,133],[10,128],[11,138],[12,116],[13,129],[14,185],[15,228],[16,346],[17,378],[18,437],[19,425],[20,482],[21,501],[22,576],[23,543],[24,590],[25,637],[26,631],[27,662],[28,681],[29,685],[30,860],[31,738],[32,741],[33,664],[34,743],[35,814],[36,728],[37,773],[38,760],[39,789],[40,812],[41,728],[42,853],[43,847],[44,839],[45,935],[46,897],[47,923],[48,938],[49,861],[50,951],[51,885],[52,856],[53,948],[54,906],[55,968],[56,830],[57,834],[58,833],[59,808],[60,798],[61,677],[62,710],[63,654],[64,628],[65,579],[66,554],[67,464],[68,447],[68,447],[69,429],[70,442],[71,382],[72,369],[73,366],[74,330],[75,338],[76,325],[77,308],[78,287],[79,249],[80,207],[81,210],[81,210],[82,162],[82,162],[83,158],[84,141],[85,119],[86,108],[87,92],[88,56],[89,52],[90,35],[91,36],[92,24],[93,17],[94,10],[98,2]];
			var data = google.visualization.arrayToDataTable(jsonData);
			var options = {
				title: 'Adverse Reactions by Age',
				width: "100%"
			};

			var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
			chart.draw(data, options);
		}
	      
		function resizeHandler () {
			chart.draw(data, options);
		}
	      
		if (window.addEventListener) {
			window.addEventListener('resize', resizeHandler, false);
		}
		else if (window.attachEvent) {
			window.attachEvent('onresize', resizeHandler);
		}
	      
		window.onload = resize();
		window.onresize = resize;
		*/
	};	
	
	$scope.displayReactionStat = function () {
		
		//google.load("visualization", "1", {packages:["corechart"]});
		//google.setOnLoadCallback(drawChart);
		
		var keyword = $("#reactionKeyword").val();
	    
	    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'reactionChart'}).
	      success(function(response) {
		    	response = JSON.parse(response).chartdata;

		    	//drawChart(response);
		    	
	      }).
	      error(function(error) {
	    	  //alert('error');
	      });
	};	
	
	
	//google.load("visualization", "1", {packages:["corechart"]});
	//google.setOnLoadCallback(drawChart);
	
     
	/*
	function resizeHandler () {
		chart.draw(data, options);
	}
      
	if (window.addEventListener) {
		window.addEventListener('resize', resizeHandler, false);
	}
	else if (window.attachEvent) {
		window.attachEvent('onresize', resizeHandler);
	}
      
	window.onload = resize();
	window.onresize = resize;
	*/
});


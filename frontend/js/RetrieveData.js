/*
$( document ).ready(function() {
	//google.load("visualization", "1", {packages:["corechart"]});
	//google.setOnLoadCallback(drawChart);
	
	function drawChart(rawdata) {
		var temp = rawdata;
    	var jsonData = [["Time","Count"],[0,14],[1,12],[2,28],[3,44],[4,71],[5,81],[6,129],[7,140],[8,132],[9,133],[10,128],[11,138],[12,116],[13,129],[14,185],[15,228],[16,346],[17,378],[18,437],[19,425],[20,482],[21,501],[22,576],[23,543],[24,590],[25,637],[26,631],[27,662],[28,681],[29,685],[30,860],[31,738],[32,741],[33,664],[34,743],[35,814],[36,728],[37,773],[38,760],[39,789],[40,812],[41,728],[42,853],[43,847],[44,839],[45,935],[46,897],[47,923],[48,938],[49,861],[50,951],[51,885],[52,856],[53,948],[54,906],[55,968],[56,830],[57,834],[58,833],[59,808],[60,798],[61,677],[62,710],[63,654],[64,628],[65,579],[66,554],[67,464],[68,447],[68,447],[69,429],[70,442],[71,382],[72,369],[73,366],[74,330],[75,338],[76,325],[77,308],[78,287],[79,249],[80,207],[81,210],[81,210],[82,162],[82,162],[83,158],[84,141],[85,119],[86,108],[87,92],[88,56],[89,52],[90,35],[91,36],[92,24],[93,17],[94,10],[98,2],[99,1]];
		var data = google.visualization.arrayToDataTable(rawdata);
		var options = {
			title: 'Adverse Reactions by Age',
			width: "100%"
		};

		var chart = new google.visualization.ColumnChart(document.getElementById('reaction_stat_div'));
		chart.draw(data, options);
	}
});
*/

$( document ).ready(function() {
	
	$( "button:first" ).click(function() {
		  update( $( "span:first" ) );
	});
	
	function update( j ) {
	    var n = parseInt( j.text(), 10 );
		j.text( n + 1 );
	}
	
	$('#drug_table_div').hide();
	
	$( "#autocomplete-input-drug" ).click(function(e) {
		//update( $( "span:first" ) );
		var code = event.keyCode || event.which;
		
		if(code == "13" || code == "9") {
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
			    		$('#drug_table_div').show();
			    		
		    	    	$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
		    	        $('#drug_table').append($thead);
			    		
			    	    $.each(response.rows, function(i, item) {
			    	    	$tr = $('<tr class="success">').append($('<td>').text(item[0]),$('<td>').text(item[1]));
			    	        $('#drug_table').append($tr);
			    	    });
			    	});
		      }).
		      error(function(error) {
		    	  //alert('error');
		      });
		}
	});
	
	$('#reaction_table_div').hide();
	
	$( "#autocomplete-input-reaction" ).click(function(e) {
		//update( $( "span:first" ) );
		var code = event.keyCode || event.which;
		
		if(code == "13" || code == "9") {
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
			    		$('#reaction_table_div').show();
			    		
		    	    	$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
		    	        $('#reaction_table').append($thead);
			    	    
			    	    $.each(response.rows, function(i, item) {			    	    	
			    	    	item[0] = item[0].replace(/(['"])/g, "\\$1");
			    	    	var link = "<div id='myDiv' onClick='drugLabelsDisplay(\"" + item[0] + "\")'><span>" + item[0] + "</span></div>";
			    	    	$('#reaction_table').append('<tr><td>' + link + '</td><td>' + item[1] +  '</td></tr>');
			    	    });
			    	    
			    	});
		      }).
		      error(function(error) {
		    	  //alert('error');
		      });
		}
	});
	
});
    
var app = angular.module("mainModule", []);

app.controller("drugController", function($scope, $http) {
	

	  $('#drug_table_div').hide();
	
	  $scope.onDrugSearch = function () {
		  
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
			    		$('#drug_table_div').show();
			    		
		    	    	$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
		    	        $('#drug_table').append($thead);
			    				    	        
			    	    $.each(response.rows, function(i, item) {
			    	    	$tr = $('<tr class="success">').append($('<td>').text(item[0]),$('<td>').text(item[1]));
			    	        $('#drug_table').append($tr);
			    	    });
			    	});
		      }).
		      error(function(error) {
		    	  //alert('error');
		      });
	  };
});

app.controller("reactionController", function($scope, $http) {

	  $('#reaction_table_div').hide();
	
	  $scope.onReactionSearch = function () {

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
			    		$('#reaction_table_div').show();
		    	    	$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
		    	        $('#reaction_table').append($thead);
			    		
			    	    $.each(response.rows, function(i, item) {			    	    	
			    	    	item[0] = item[0].replace(/(['"])/g, "\\$1");
			    	    	var link = "<div id='myDiv' onClick='drugLabelsDisplay(\"" + item[0] + "\")'><span>" + item[0] + "</span></div>";
			    	    	$('#reaction_table').append('<tr><td>' + link + '</td><td>' + item[1] +  '</td></tr>');
			    	    });
			    	});
		      }).
		      error(function(error) {
		    	  //alert('error');
		      });
	  };
});

function drugLabelsDisplay(drugName) {
	//alert(link);
	
	var keyword = drugName;
	
    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'drugInfo'}).
    success(function(response) {
	    	response = JSON.parse(response);
	    	
	    	$(function() {
	    		$('#reaction_table_div').hide();
	    		
	    		
  	    	/*$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
  	        $('#drug_table').append($thead);*/
	    		
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
	    	    //$('#drug-info').append('<div tabindex="-1" id="myModal" aria-hidden="false"></div>');
	    	    //$('#drug-info').append('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">');
	    	    

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
	$scope.reset = function () {
		document.getElementById("reaction_table").innerHTML = "";
		document.getElementById("reaction_table_div").style.display = "none";
		document.getElementById("drug_table").innerHTML = "";
		document.getElementById("drug_table_div").style.display = "none";
		document.getElementById("drug-info").innerHTML = "";
		document.getElementById("stat_div").innerHTML = "";
		document.getElementById("drugKeyword").value = ""; 
		document.getElementById("reactionKeyword").value = "";
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
		
		//var keyword = $("#reactionKeyword").val();
	    
		var keyword = "Abdominal Pain";
		
	    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'reactionChart'}).
	      success(function(response) {
		    	response = JSON.parse(response).chartdata;

		    	drawChart(response);
		    	
	      }).
	      error(function(error) {
	    	  //alert('error');
	      });
	    
	    google.load("visualization", "1", {packages:["corechart"]});
		google.setOnLoadCallback(drawChart);
	    function drawChart(response) {
			var jsonData = response;
			var data = google.visualization.arrayToDataTable(jsonData);
			var options = {
				title: 'Adverse Reactions by Age',
				width: "100%"
			};

			var chart = new google.visualization.ColumnChart(document.getElementById('reaction_stat_div'));
			chart.draw(data, options);
		}
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


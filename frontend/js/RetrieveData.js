
var app = angular.module("mainModule", []);

app.controller("drugController", function($scope, $http) {

	  $('#drug_table_div').hide();
	
	  $scope.onDrugSearch = function () {

		    var keyword = $("#drugKeyword").val();
		    
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

		    var keyword = $("#reactionKeyword").val();
		    
		    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword, type:'reaction'}).
		      success(function(response) {
			    	response = JSON.parse(response);
			    	
			    	$(function() {
			    		$('#reaction_table_div').show();
		    	    	$thead = $('<thead>').append($('<tr>').append($('<th>').text(response.cols[0]),$('<th>').text(response.cols[1])));
		    	        $('#reaction_table').append($thead);
			    		
			    	    $.each(response.rows, function(i, item) {
			    	    	
			    	    	item[0] = item[0].replace(/(['"])/g, "\\$1");
			    	    	
			    	    	/*var str = "Visit Microsoft!";
			    	    	item[0] = item[0].replace("<a ", "<a class='reaction-link'");
			    	    	var link = "<a href='javascript:void(0)' ";*/
			    	    	
			    	    	item[0] = "BEVACIZUMAB";
			    	    	
			    	    	var link = "<div id='myDiv' onClick='drugLabelsDisplay(\"" + item[0] + "\")'>" + "testname" + "</div>";
			    	    	
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
	    		
	    	    $.each(response.images, function(i, item) {
	    	    		    	    	
	    	    	$('#drug-info').append('<img src="' + item + '" class="img-rounded" alt="Cinque Terre" width="304" height="236">');	    	    	
	    	    });
	    	});
    }).
    error(function(error) {
  	  //alert('error');
    });
}

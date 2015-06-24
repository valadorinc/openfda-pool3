
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
			    	    	//$tr = $('<tr class="success">').append($('<td>').text(item.reaction));
			    	    	$tr = $('<tr class="success">').append($('<td>').text(item[0]),$('<td>').text(item[1]));
			    	        $('#drug_table').append($tr);
			    	    });
			    	});
		      }).
		      error(function(response) {
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
			    	        //$tr = $('<tr class="success">').append($('<td>').text(item.reaction),$('<td>').text(item.count),$('<td>').text(item.term));
			    	    	$tr = $('<tr class="success">').append($('<td>').text(item[0]),$('<td>').text(item[1]));
			    	        $('#reaction_table').append($tr);
			    	    });
			    	});
		      }).
		      error(function(response) {
		    	  //alert('error');
		      });
	  };
});


var app = angular.module("mainModule", []);

app.controller("mainController", function($scope, $http) {

	  $('#records_table_div').hide();
	
	  $scope.onSubmitBtnClick = function () {

		    var keyword = $("#keyword").val();
		    
		    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword}).
		      success(function(response) {
			    	response = JSON.parse(response);
			    	
			    	$(function() {
			    		$('#records_table_div').show();
			    	    $.each(response, function(i, item) {
			    	        //$tr = $('<tr class="success">').append($('<td>').text(item.reaction),$('<td>').text(item.count),$('<td>').text(item.term));
			    	    	$tr = $('<tr class="success">').append($('<td>').text(item.reaction));
			    	        $('#records_table').append($tr);
			    	    });
			    	});
		      }).
		      error(function(response) {
		    	  alert('error');
		      });
	  };
});


var app = angular.module("mainModule", []);

app.controller("mainController", function($scope, $http) {

	  $scope.onSubmitBtnClick = function () {

		    var keyword = $("#keyword").val();
		    
		    $.get('data/OpenFdaDataRetrieval.php', {keyword:keyword}).
		      success(function(response) {
			    	response = JSON.parse(response);
			    	
			    	$(function() {
			    	    $.each(response, function(i, item) {
			    	        var $tr = $('<tr>').append(
			    	            $('<td>').text(item.reaction),
			    	            $('<td>').text(item.count),
			    	            $('<td>').text(item.term)
			    	        );
			    	        $('#records_table').append($tr);
			    	    });
			    	});
		      }).
		      error(function(response) {
		    	  alert('error');
		      });
	  };
});

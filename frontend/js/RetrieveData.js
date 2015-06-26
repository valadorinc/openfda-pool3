
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
			    	    	
			    	    	/*var str = "Visit Microsoft!";
			    	    	item[0] = item[0].replace("<a ", "<a class='reaction-link'");
			    	    	var link = "<a href='javascript:void(0)' ";*/
			    	    	
			    	    	//item[0] = "BEVACIZUMAB";
			    	    	
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
	    	    
	    	    $.each(response.DrugInfo.images, function(i, item) {
	    	    	$('#drug-info').append('<img src="' + item + '" class="img-rounded" alt="Cinque Terre" width="304" height="236">');	    	    	
	    	    });
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

app.controller("resetController", function($scope) {
	$scope.reset = function () {
		//$('#reactionKeyword input').html('');
		//$('#drugKeyword input').html('');
		//$('#drug_table div').html('');
		//var myEl = angular.element( document.querySelector('.thread'));
		//myEl = angular.element( document.querySelector('#reaction_table_div'));
		//document.getElementById('reaction_table_div').innerHTML = "";
		/*
		var div = document.getElementById('reaction_table_div');
		while(div.firstChild){
		    div.removeChild(div.firstChild);
		}
		*/
		//myEl.remove();
		window.location.href = 'index.php';
	};
	
});

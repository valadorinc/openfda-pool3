$(document).ready(function() 
{
	
	$( "#autocomplete-input-drug" ).focus();
	
    $('#drugTab').click(function(e) {
    	$("#drug-reaction-tab-container").css("background-color", "#154898");
    	
    	if( !$.trim( $('#result1').html() ).length ) {
    	    $('#drug-reaction-tab-container').addClass('gradient-drug-search').removeClass('gradient-reaction-search');
    	    $('#btnDiv1').hide();
    	}
    	else {
    		$('#drug-reaction-tab-container').removeClass('gradient-reaction-search');
    		$('#btnDiv1').show();
    	}
    	
    	$("#autocomplete-input-drug").focus();
    });
    
    $('#reactionTab').click(function(e) {
    	$("#drug-reaction-tab-container").css("background-color", "#FF6600");
    	
    	if( !$.trim( $('#result2').html() ).length ) {
    	    $('#drug-reaction-tab-container').addClass('gradient-reaction-search').removeClass('gradient-drug-search');
    	    $('#btnDiv2').hide();
    	}
    	else {
    		$('#drug-reaction-tab-container').removeClass('gradient-drug-search');
    		$('#btnDiv2').show();
    	}
    	
    	$("#autocomplete-input-reaction").focus();
    });
    
    $('a[data-toggle="pill"]').on('#drugTab', function (e) {
        $("#autocomplete-input-drug").focus();
    });
    
    $('a[data-toggle="pill"]').on('#reactionTab', function (e) {
  	    $("#autocomplete-input-reaction").focus();
    });
    
});

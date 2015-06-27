$(document).ready(function() 
 {
    $('#drugTab').click(function(e) { 
    	$("#drug-reaction-tab-container").css("background-color", "#154898");
    	$('#drug-reaction-tab-container').addClass('gradient-drug-search').removeClass('gradient-reaction-search');
    });
    
    $('#reactionTab').click(function(e) { 
    	$("#drug-reaction-tab-container").css("background-color", "#FF6600");
    	$('#drug-reaction-tab-container').addClass('gradient-reaction-search').removeClass('gradient-drug-search');
    });
 });

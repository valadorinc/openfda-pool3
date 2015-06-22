$( document ).ready(function() {
	//$("#submit").keyup(function() {
	$( "#submit" ).click(function(e) {
		  e.preventDefault();
		  alert( "Handler for .click() called." );
		  var keyword = $("#keyword").val();
		  
		  $.get( "data/OpenFdaDataRetrieval.php", { keyword: keyword } )
		  //$.get( "data/OpenFdaDataRetrieval.php" )
			.done(function( data ) {
				$('#openfdaresults').html('');
				var results = jQuery.parseJSON(data);
				$(results).each(function(key, value) {
					$('#openfdaresults').append('<div class="item">' + value + '</div>');
				})

			    /*$('.item').click(function() {
			    	var text = $(this).html();
			    	$('#keyword').val(text);
			    })*/

			});
		/*} else {
			$('#openfdaresults').html('');
		}*/
	});
});
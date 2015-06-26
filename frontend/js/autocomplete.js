    
$(function() {
	  
	  function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }
       
    $( "#autocomplete-input-drug" ).autocomplete({
      source: function( request, response ) {
    	  
    	var keyword = request.term.replace(/\s/g, "%20");
    	  
        $.ajax({
          url: "autocomplete/auto-complete.php",
          dataType: "json",
          data: {
        	type: $( "#autocomplete-input-drug" ).attr( "name" ),
            keyword: keyword
          },
          success: function( data ) {
            response( data );
          }
        });
      },
      minLength: 3,
      select: function( event, ui ) {
        log( ui.item ?
          "Selected: " + ui.item.label :
          "Nothing selected, input was " + this.value);
      },
      open: function() {
        //$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        //$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
    
    $( "#autocomplete-input-reaction" ).autocomplete({
        source: function( request, response ) {
          $.ajax({
            url: "autocomplete/auto-complete.php",
            dataType: "json",
            data: {
              type: $( "#autocomplete-input-reaction" ).attr( "name" ),
              keyword: request.term
            },
            success: function( data ) {
              response( data );
            }
          });
        },
        minLength: 3,
        select: function( event, ui ) {
          log( ui.item ?
            "Selected: " + ui.item.label :
            "Nothing selected, input was " + this.value);
        },
        open: function() {
          //$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
          //$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
      });    
  });

  $(function() {
    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }

    var drugKeyword = $("#drugKeyword").val();
    var reactionKeyword = $("#reactionKeyword").val();
    
    $( "#drugKeyword" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "autocomplete/auto-complete.php",
          dataType: "json",
          data: {
        	type: 'drug',
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
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
    
    $( "#reactionKeyword" ).autocomplete({
        source: function( request, response ) {
          $.ajax({
            url: "autocomplete/auto-complete.php",
            dataType: "json",
            data: {
              type: 'reaction',
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
          $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
          $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
      });
    
  });

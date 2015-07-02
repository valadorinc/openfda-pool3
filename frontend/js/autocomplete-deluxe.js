$(document).ready(function() {
//});

//(function($) {
  
    /*var Person = function (firstName) {
        this.firstName = firstName;
    };

    Person.prototype.sayHello = function() {
        //console.log("Hello, I'm " + this.firstName);
		alert("Hello, I'm " + this.firstName);
    };

    var person1 = new Person("Alice");
    var person2 = new Person("Bob");

    // call the Person sayHello method.
    person1.sayHello(); // logs "Hello, I'm Alice"
    person2.sayHello(); // logs "Hello, I'm Bob"*/
  
  //var AppRXContainer = AppRXContainer || {};
  
	var AutoCompleteApp = AutoCompleteApp || { 'locale': {} };
	
	/**
	 * Replace placeholders with sanitized values in a string.
	 *
	 * @param str
	 *   A string with placeholders.
	 * @param args
	 *   An object of replacements pairs to make. Incidences of any key in this
	 *   array are replaced with the corresponding value. Based on the first
	 *   character of the key, the value is escaped and/or themed:
	 *    - !variable: inserted as is
	 *    - @variable: escape plain text to HTML (AutoCompleteApp.checkPlain)
	 *    - %variable: escape text and theme as a placeholder for user-submitted
	 *      content (checkPlain + AutoCompleteApp.theme('placeholder'))
	 *
	 * @see AutoCompleteApp.t()
	 * @ingroup sanitization
	 */
	AutoCompleteApp.formatString = function(str, args) {
	  // Transform arguments before inserting them.
	  for (var key in args) {
	    switch (key.charAt(0)) {
	      // Escaped only.
	      case '@':
	        args[key] = AutoCompleteApp.checkPlain(args[key]);
	      break;
	      // Pass-through.
	      case '!':
	        break;
	      // Escaped and placeholder.
	      case '%':
	      default:
	        args[key] = AutoCompleteApp.theme('placeholder', args[key]);
	        break;
	    }
	    str = str.replace(key, args[key]);
	  }
	  return str;
	};

	/**
	 * Translate strings to the page language or a given language.
	 *
	 * See the documentation of the server-side t() function for further details.
	 *
	 * @param str
	 *   A string containing the English string to translate.
	 * @param args
	 *   An object of replacements pairs to make after translation. Incidences
	 *   of any key in this array are replaced with the corresponding value.
	 *   See AutoCompleteApp.formatString().
	 *
	 * @param options
	 *   - 'context' (defaults to the empty context): The context the source string
	 *     belongs to.
	 *
	 * @return
	 *   The translated string.
	 */
	AutoCompleteApp.t = function (str, args, options) {
	  options = options || {};
	  options.context = options.context || '';

	  // Fetch the localized version of the string.
	  if (AutoCompleteApp.locale.strings && AutoCompleteApp.locale.strings[options.context] && AutoCompleteApp.locale.strings[options.context][str]) {
	    str = AutoCompleteApp.locale.strings[options.context][str];
	  }

	  if (args) {
	    str = AutoCompleteApp.formatString(str, args);
	  }
	  return str;
	};

	/**
	 * Encode special characters in a plain-text string for display as HTML.
	 *
	 * @ingroup sanitization
	 */
	AutoCompleteApp.checkPlain = function (str) {
	  var character, regex,
	      replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
	  str = String(str);
	  for (character in replace) {
	    if (replace.hasOwnProperty(character)) {
	      regex = new RegExp(character, 'g');
	      str = str.replace(regex, replace[character]);
	    }
	  }
	  return str;
	};
	
	AutoCompleteApp.theme = function (func) {
	  var args = Array.prototype.slice.apply(arguments, [1]);

	  return (AutoCompleteApp.theme[func] || AutoCompleteApp.theme.prototype[func]).apply(this, args);
	};

	AutoCompleteApp.theme.prototype = {

        /**
         *  Formats text for emphasized display in a placeholder inside a sentence.
	     *
	     * @param str
    	 *   The text to format (plain-text).
	     * @return
	     *   The formatted text (html).
	     */
	     placeholder: function (str) {
	         return '<em class="placeholder">' + AutoCompleteApp.checkPlain(str) + '</em>';
	     }
	 };

	
  /*/////////////////////////////////////////////////////////////*/
  /*/////////////////////////////////////////////////////////////*/
  /*/////////////////////////////////////////////////////////////*/
	
  var AppRX = AppRX || {};
  
  /*this.AppRX = {
    attach: function(context) {
      //var autocomplete_settings = AutoCompleteApp.settings.autocomplete_deluxe;

      $("input.autocomplete-form").once( function() {
        //if (autocomplete_settings[$(this).attr('id')].multiple === true) {
          new AppRX.MultipleWidget(this);
        //} else {
        //  new AutoCompleteApp.autocomplete_deluxe.SingleWidget(autocomplete_settings[$(this).attr('id')]);
        //}
      });
    }
  };*/
    
  /*$("input.autocomplete-form").one("click", function(){
      new AppRX.MultipleWidget(this);
  });*/
  
  /**
   * Autogrow plugin which auto resizes the input of the multiple value.
   *
   * http://stackoverflow.com/questions/931207/is-there-a-jquery-autogrow-plugin-for-text-fields
   *
   */
  $.fn.autoGrowInput = function(o) {

    o = $.extend({
      maxWidth: 1000,
      minWidth: 0,
      comfortZone: 70
    }, o);

    this.filter('input:text').each(function(){

      var minWidth = o.minWidth || $(this).width(),
        val = '',
        input = $(this),
        testSubject = $('<tester/>').css({
          position: 'absolute',
          top: -9999,
          left: -9999,
          width: 'auto',
          fontSize: input.css('fontSize'),
          fontFamily: input.css('fontFamily'),
          fontWeight: input.css('fontWeight'),
          letterSpacing: input.css('letterSpacing'),
          whiteSpace: 'nowrap'
        }),
        check = function() {

          if (val === (val = input.val())) {return;}

          // Enter new content into testSubject
          var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,'&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          testSubject.html(escaped);

          // Calculate new width + whether to change
          var testerWidth = testSubject.width(),
            newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
            currentWidth = input.width(),
            isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
              || (newWidth > minWidth && newWidth < o.maxWidth);

          // Animate width
          if (isValidWidthChange) {
            input.width(newWidth);
          }

        };

      testSubject.insertAfter(input);

      $(this).bind('keyup keydown blur update', check);

    });

    return this;
  };


  AppRX.empty =  {label: '- ' + AutoCompleteApp.t('None') + ' -', value: "" };

  /**
   * EscapeRegex function from jquery autocomplete, is not included in AutoCompleteApp.
   */
  AppRX.escapeRegex = function(value) {
    //return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi, "\\$&");
	return value;
  };

  AppRX.filter = function(array, term) {
    var matcher = new RegExp(AppRX.escapeRegex(term), "i");
    return $.grep(array, function(value) {
      return matcher.test(value.label || value.value || value);
    });
  };
    
  AppRX.Widget = function() {
  }
  
  AppRX.Widget.prototype.init = function(id) {
      //this.id = 'autocomplete-input';
	  this.id = id;
      this.jqObject = $('#' + this.id);
	  this.multiple = true;
	  this.required = false;
	  this.limit = 10;
	  this.synonyms = 0;
	  this.wrapper = '""';
	  this.items = {};
	  var self = this;
	  var parent = this.jqObject.parent();
	  var parents_parent = this.jqObject.parent().parent();
	  
	  parents_parent.append(this.jqObject);
      parent.remove();
      parent = parents_parent;
	  
      var generateValues = function(data, term) {
          var result = new Array();
          for (var terms in data) {
              if (self.acceptTerm(terms)) {
                  result.push({
                  label: data[terms],
                  value: terms
              });
          }
      }  
      if ($.isEmptyObject(result)) {
          result.push({
              label: AutoCompleteApp.t("The term '@term' will be added.", {'@term' : term}),
              value: term,
              newTerm: true
          });
      }
      return result;
      };

      var cache = {}
      var lastXhr = null;
	
      this.jqObject.autocomplete({
          'source' : this.source,
          'minLength': "0"
      });
	
	  var jqObject = this.jqObject;
      var throbber = $('<div class="autocomplete-throbber autocomplete-closed">&nbsp;</div>').insertAfter(jqObject);

      this.jqObject.bind("autocompletesearch", function(event, ui) {
          throbber.removeClass('autocomplete-closed');
          throbber.addClass('autocomplete-open');
      });

      this.jqObject.bind("autocompleteopen", function(event, ui) {
          throbber.addClass('autocomplete-closed');
          throbber.removeClass('autocomplete-open');
      });

      // Monkey patch the _renderItem function jquery so we can highlight the
      // text, that we already entered.
      $.ui.autocomplete.prototype._renderItem = function( ul, item) {
          var t = item.label;
          if (this.term != "") {    		
              var escapedValue = AppRX.escapeRegex( this.term );
              var re = new RegExp('()*""' + escapedValue + '""|' + escapedValue + '()*', 'gi');
              var t = item.label.replace(re,"<span class='autocomplete-highlight-char'>$&</span>");
          }
          return $( "<li></li>" )
              .data( "item.autocomplete", item )
              .append( "<a>" + t + "</a>" )
              .appendTo( ul );
      };
	  
      //alert("init");
  };
  
  /**
   * Creates a multiple selecting widget.
   */
  AppRX.MultipleWidget = function(input, id) {
    this.init(id);
    this.setup();
  };
  
  AppRX.MultipleWidget.prototype = new AppRX.Widget();
  AppRX.MultipleWidget.prototype.items = new Object();
  
  AppRX.MultipleWidget.prototype.acceptTerm = function(term) {
    // Accept only terms, that are not in our items list.
	return !(term in this.items);
  };
  
  AppRX.MultipleWidget.Item = function (widget, item) {
    if (item.newTerm === true) {
      item.label = item.value;
    }

    this.value = item.value;
    this.element = $('<span class="autocomplete-item">' + item.label + '</span>');
    this.widget = widget;
    this.item = item;
    var self = this;

    var close = $('<a class="autocomplete-item-delete" href="javascript:void(0)"></a>').appendTo(this.element);
    // Use single quotes because of the double quote encoded stuff.
    var input = $('<input type="hidden" value=\'' + this.value + '\'/>').appendTo(this.element);

    close.mousedown(function() {
      self.remove(item);
    });
  };

  AppRX.MultipleWidget.Item.prototype.remove = function(e) {
    this.element.remove();
     
    delete this.widget.items[this.item.label];
    
    var resetBtnIdName = '';
    
    if(this.widget.id == "autocomplete-input-drug") {
    	if( Object.keys(this.widget.items).length <= 0 ) {
    	    resetBtnIdName = 'resetBtn1';
    	    var el = document.getElementById(resetBtnIdName);
    	    angular.element(el).trigger('click');
    	}
        else {
        	$( "#" + this.widget.id ).trigger( "click" );
        }
    }
    else if(this.widget.id == "autocomplete-input-reaction") {
    	if( Object.keys(this.widget.items).length <= 0 ) {
    	    resetBtnIdName = 'resetBtn2';
	        var el = document.getElementById(resetBtnIdName);
	        angular.element(el).trigger('click');
    	}
        else {
        	$( "#" + this.widget.id ).trigger( "click" );
        }
    }
  };
    
  AppRX.MultipleWidget.prototype.setup = function() {
    var jqObject = this.jqObject;
    var parent = jqObject.parent();
    var value_container = jqObject.parent().parent().children('.autocomplete-value-container');
    var value_input = value_container.children().children();
    var items = this.items;
    var self = this;
    this.valueForm = value_input;

    // Override the resize function, so that the suggestion list doesn't resizes
    // all the time.
    jqObject.data("autocomplete")._resizeMenu = function()  {};

    jqObject.show();

    value_container.hide();

    // Add the default values to the box.
    var default_values = value_input.val();
    default_values = $.trim(default_values);
    default_values = default_values.substr(2, default_values.length-4);
    default_values = default_values.split('"" ""');

    for (var index in default_values) {
      var value = default_values[index];
      if (value != '') {
        // If a terms is encoded in double quotes, then the label should have
        // no double quotes.
        var label = value.match(/["][\w|\s|\D|]*["]/gi) !== null ? value.substr(1, value.length-2) : value;
        var item = {
          label : label,
          value : value
        };
        var item = new AppRX.MultipleWidget.Item(self, item);
        item.element.insertBefore(jqObject);
        items[item.value] = item;
      }
    }

    jqObject.addClass('autocomplete-multiple');
    parent.addClass('autocomplete-multiple');

    // Adds a value to the list.
    this.addValue = function(ui_item) {
      var item = new AppRX.MultipleWidget.Item(self, ui_item);
      item.element.insertBefore(jqObject);
      items[ui_item.value] = item;
      var new_value = ' ' + self.wrapper + ui_item.value + self.wrapper;
      var values = value_input.val();
      value_input.val(values + new_value);
      jqObject.val('');
    };

    parent.mouseup(function() {
      jqObject.autocomplete('search', '');
      jqObject.focus();
    });

    jqObject.bind("autocompleteselect", function(event, ui) {
      self.addValue(ui.item);
      event.preventDefault();
      
      $( "#" + this.id ).trigger( "click" );
      
      if(this.id == "autocomplete-input-drug") {
          jqObject.width(85);
      }
      else {
    	  jqObject.width(125);
      }
      // Return false to prevent setting the last term as value for the jqObject.
      return false;
    });

    jqObject.bind("autocompletechange", function(event, ui) {
      jqObject.val('');
    });

    jqObject.blur(function() {
      var last_element = jqObject.parent().children('.autocomplete-item').last();
      last_element.removeClass('autocomplete-item-focus');
    });

    this.createSearchTerm = function(event) {
    	
    	var code = event.keyCode || event.which;
    	
        var value = jqObject.val();

        if ((code == self.delimiter && (value.split('"').length - 1) != 1) || (code == 13 && jqObject.val() != "" && $.trim(jqObject.val()) != "") ||
            (event.which == 9 && jqObject.val() != "" && $.trim(jqObject.val()) != "")) {
            value = value.substr(0, value.length);
            clear = true;
            if (code == 13 || code == 9) {
          	
          	    value = $.trim(value);
          	
                var ui_item = {
  	                label: value,
  	                value: value
  	            };
  	            self.addValue(ui_item); 	            
  	            
  	          $( "#" + this.id ).trigger( "click" );

                return false;
            }
        }

        // If the Backspace key was hit and the input is empty
        if (event.which == 8 && value == '') {
          var last_element = jqObject.parent().children('.autocomplete-item').last();
          // then mark the last item for deletion or deleted it if already marked.
          if (last_element.hasClass('autocomplete-item-focus')) {
            var value = last_element.children('input').val();
            self.items[value].remove(self.items[value]);
            jqObject.autocomplete('search', '');
          } else {
            last_element.addClass('autocomplete-item-focus');
          }
        } else {
          // Remove the focus class if any other key was hit.
          var last_element = jqObject.parent().children('.autocomplete-item').last();
          last_element.removeClass('autocomplete-item-focus');
        }
    };
    
    var clear = false;
    
    parent.keydown(function(event) {
        var code = event.keyCode || event.which;

        if (code === 9) {  
            event.preventDefault();
            self.createSearchTerm(event);
        }
        else {
            self.createSearchTerm(event);
        }
    });
    
    if(this.id == "autocomplete-input-drug") {
    	comfortZoneVar = 85;
    	minWidthVar = 0;
    	maxWidth = 460;
    }
    else {
    	comfortZoneVar = 125;
    	minWidthVar = 0;
    	maxWidth = 460;    	
    }
    
    jqObject.autoGrowInput({
      comfortZone: comfortZoneVar,
      minWidth: minWidthVar,
      maxWidth: maxWidth
    });

    jqObject.keyup(function (event) {
      if (clear) {
        // Trigger the search, so it display the values for an empty string.
        jqObject.autocomplete('search', '');
        jqObject.val('');
        clear = false;
        // Return false to prevent entering the last character.
        return false;
      }
    });
  };
   
  new AppRX.MultipleWidget(this, "autocomplete-input-drug");
  new AppRX.MultipleWidget(this, "autocomplete-input-reaction");
  
  //var widget1 = new AppRX.Widget();
  //widget1.init();
  //widget1.setup();
  

});  
//})(jQuery);
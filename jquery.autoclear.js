/**
 * Apply a default value to text fields quickly &amp; easily.
 *
 * The easiest way to use is $('your-selector').autoclear(). All the defaults
 * in the settings object are used. For more advanced cases, and complete
 * reference, @see http://www.mattlunn.me.uk/projects/autoclear
 *
 * @author Matt Lunn
 * @version 1.0
 * @param  Object / String / Function
 * @param  Function
 * @return Object jQuery
 * @see http://www.mattlunn.me.uk/projects/autoclear
 * @see README 
 */
(function ($) {
  jQuery.fn.autoclear = function (params, callback) {
    var settings = {
      defaultClass: 'default',
      otherClass: 'other',
      defaultValue: '',
      useDefaultOnReset: true,
      clearDefaultOnSubmit: true,
      callback: jQuery.noop
    };
    
    if (arguments.length) {
      if (typeof params === "string") {
        settings.defaultClass = params;
      } else if (typeof params === "object") {
        settings = jQuery.extend(settings, params);
      } else if (typeof params === "function") {
        settings.callback = params;
      };
      
      if (typeof callback === "function") {
        settings.callback = callback;
      };
    };

    this.bind({
      'focus.autoclear blur.autoclear': function (event) {
        var self = $(this),
            currentValue = jQuery.trim(this.value),
            defaultValue = this.title;
            
        if (event.type === "focus") {
          if (currentValue === defaultValue) {
            self.trigger('clear.autoclear');
          };
        } else {
          if (currentValue === "" || currentValue === defaultValue) {
            self.trigger('default.autoclear');
          };
        };
      },
      'clear.autoclear': function () {
        var self = $(this);
        
        this.value = '';

        if (!self.hasClass(settings.otherClass)) {
          self.removeClass(settings.defaultClass).addClass(settings.otherClass);
          settings.callback.call(this, 'clear');
        };
      },
      'default.autoclear': function () {
        var self = $(this);
        
        this.value = this.title;

        if (!self.hasClass(settings.defaultClass)) {
          self.removeClass(settings.otherClass).addClass(settings.defaultClass);
          settings.callback.call(this, 'default');
        };
      }
    });
    
    this.each(function () {
      var self = $(this),
          form = self.closest('form');
      
      function set(el, val) {
        return el[val] !== undefined && el[val] !== "";
      };
      
      if (settings.useDefaultOnReset) {
        this.value = this.defaultValue;
        this.defaultValue = this.title;

        form.bind('reset.autoclear', function () {
          self.trigger('default.autoclear');
        });
      };
      
      if (settings.clearDefaultOnSubmit) {
        form.bind('submit.autoclear', function () {
          self.trigger('focus.autoclear');
        });
      };      
      
      if (!set(this, 'title') && !set(this, 'value')) {
        this.title = settings.defaultValue;
        self.trigger('default.autoclear');
      } if (!set(this, 'title')) {
        this.title = this.value;
        self.trigger('default.autoclear');
      } else if (!set(this, 'value')) {
        self.trigger('default.autoclear');
      } else {
        self.addClass(settings.otherClass);
      };
    });
  };
}(jQuery));
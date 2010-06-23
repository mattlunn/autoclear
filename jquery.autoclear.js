/**
 * Apply a default value to text fields quickly &amp; easily.
 *
 * The easiest way to use is $('your-selector').autoclear(). All the defaults
 * in the settings object are used. For more advanced cases, and complete
 * reference, @see http://www.mattlunn.me.uk/projects/autoclear
 *
 * @author Matt Lunn
 * @version 2
 * @param  Object / String
 * @return Object jQuery
 * @see http://www.mattlunn.me.uk/projects/autoclear
 * @see README 
 */
; (function ($) {

	function isBlank (prop) {
		return prop === undefined || prop === '';
	};
 
	jQuery.fn.autoclear = function (options) {
		var settings = {
			defaultClass: 'default',
			otherClass: 'other',
			defaultValue: '',
			useDefaultOnReset: true,
			clearDefaultOnSubmit: true
		};
		
		if (arguments.length) {
			switch (typeof options) {
			case "string":
				settings.defaultClass = options;
			break;
			case "object":
				settings = jQuery.extend(settings, options);
			break;
			};
		};
		
		this.filter('input:text,textarea').each(function () {
			var self = $(this);
			var defaultValue = self.attr('title');
			var form = self.closest('form');

			if (isBlank(defaultValue)) {
				if (self.val() === '') {
					defaultValue = settings.defaultValue;
				} else {
					defaultValue = self.val();
				};
			};

			self.data('default.autoclear', defaultValue);			

			form.bind('reset', function () {
				if (settings.useDefaultOnReset) {
					self.trigger('default');
				} else {
					self.val(self.attr('defaultValue')).trigger('blur');
				};
			});
			
			if (settings.useDefaultOnReset || isBlank(jQuery.trim(self.attr('defaultValue')))) {
				self.val(self.val()).attr('defaultValue', defaultValue);
			};
			
			if (settings.clearDefaultOnSubmit) {
				form.bind('submit', function () {
					self.trigger('focus');
				});
			};
		}).bind({
			'focus.autoclear': function () {
				var self = $(this);
				
				if (self.val() == self.data('default.autoclear')) {
					self.val('').trigger('other');
				};
			},
			'blur.autoclear': function () {
				var self = $(this);
				var value = jQuery.trim(self.val());

				if (value === self.data('default.autoclear') || value === '') {
					self.trigger('default');
				} else {
					self.trigger('other');
				};
			},
			'default.autoclear': function () {
				var self = $(this);
				
				self.val(self.data('default.autoclear')).removeClass(settings.otherClass).addClass(settings.defaultClass);
			},
			'other.autoclear': function () {
				var self = $(this);
				
				self.removeClass(settings.defaultClass).addClass(settings.otherClass);
			}
		}).trigger('blur');
		
		return this;
	};
	
}(jQuery));
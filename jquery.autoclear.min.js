/**
 * Apply a helper value to text fields quickly &amp; easily.
 *
 * The easiest way to use is $('your-selector').autoclear(). All the defaults
 * in the settings object are used. For more advanced cases, and complete
 * reference, @see http://www.mattlunn.me.uk/projects/autoclear
 *
 * @author Matt Lunn
 * @version 7
 * @param  Object / String
 * @return Object jQuery
 * @see http://www.mattlunn.me.uk/projects/autoclear
 * @see README
 */
;(function(d){function k(a){return a===undefined||a===""}function g(a){return l.apply(a,p.call(arguments,1))}function m(a){a=d(a);a.val()===""&&g(a,"").trigger("other.autoclear");return a}function h(a){a=d(a);jQuery.trim(a.val())===""?a.trigger("default.autoclear"):a.trigger("other.autoclear");return a}var p=[].slice,l=jQuery.fn.val;jQuery.fn.autoclear=function(a){var c={defaultClass:"default",otherClass:"other",defaultValue:"",useDefaultOnReset:true,clearDefaultOnSubmit:true};if(arguments.length)switch(typeof a){case "string":c.defaultClass=a;break;case "object":c=jQuery.extend(c,a)}return this.bind({"default.autoclear":function(){var b=d(this).removeClass(c.otherClass).addClass(c.defaultClass);g(b,b.data("default.autoclear"))},"other.autoclear":function(){d(this).removeClass(c.defaultClass).addClass(c.otherClass)},"focus.autoclear blur.autoclear":function(b){(b.type==="focus"?m:h)(this)}}).each(function(){var b=d(this),n=b.closest("form"),i=jQuery.trim(g(b)),e=b.attr("title");if(k(e))e=i===""?c.defaultValue:i;b.data("default.autoclear",e);n.bind("reset.autoclear",function(j){var f=j.originalEvent;setTimeout(function(){if(!(f.defaultPrevented||f.returnValue===false||f.getPreventDefault&&f.getPreventDefault())){var o;o=c.useDefaultOnReset?"":b.attr("defaultValue");b.val(o)}},0)});if(c.useDefaultOnReset||k(jQuery.trim(b.attr("defaultValue"))))b.attr("defaultValue",e).val(i);c.clearDefaultOnSubmit&&n.bind("submit.autoclear",function(j){if(!j.isDefaultPrevented()){m(b);setTimeout(function(){h(b)},0)}});h(this)})};jQuery.fn.val=function(){var a=l.apply(this,arguments),c;if(typeof a==="string"){c=this.first().data("default.autoclear");if(c!==undefined&&a===c)a=""}else this.each(function(){var b=d(this);b.data("default.autoclear")!==undefined&&b.val()===""?b.trigger("default.autoclear"):b.trigger("other.autoclear")});return a}})(jQuery);
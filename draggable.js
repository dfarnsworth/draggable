/*
 *	Plugin: Draggable - jQuery Draggable w/o jQueryUI
 */
/*jshint smarttabs:true jquery:true browser:true expr:true*/
/*global define*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
	"use strict";
	var Draggable = function(element,options){
		// instance globals for use later
		var offsetStartX, offsetStartY, positionStartX, positionStartY, pageStartX, pageStartY;
		var $el = element;	// the draggable element
		var opts = options;	// instance options
		var height = $el.outerHeight();
		var width = $el.outerWidth();

		// assign cursor type
		opts.cursor && $el.css("cursor",opts.cursor);

		$el.on("mousedown", startDrag);

		// startDrag()
		function startDrag(e){
			var offset = $el.offset();
			var position = $el.position();

			// get click position
			pageStartX = e.pageX;
			pageStartY = e.pageY;
			offsetStartX = offset.left + width - pageStartX;
			offsetStartY = position.top + height - pageStartY;
			positionStartX = position.left;
			positionStartY = position.top;

			$(window).on("mousemove.dragging", doDrag)
					 .on("mouseup", stopDrag);
		}

		// stopDrag()
		function stopDrag(){
			$(window).off("mousemove.dragging", doDrag);
		}

		// doDrag()
		function doDrag(e){
			var newX, newY;		// will be used later
			var position = {};	// container for positioning via css
			var change = {
				dX: e.pageX - pageStartX,	// horizontal change
				dY: e.pageY - pageStartY	// vertical change
			};

			// set new coordinates
			if (opts.contain) {
				// relative to parent
				newX = change.dX + positionStartX;
				newY = change.dY + positionStartY;
			} else {
				// relative to page
				newX = e.pageX + offsetStartX - width;
				newY = e.pageY + offsetStartY - height;
			}

			// horizontal constraints
			if (opts.xMin !== false && newX <= opts.xMin) newX = opts.xMin;
			if (opts.xMax !== false && newX >= opts.xMax) newX = opts.xMax;
			// vertical constraints
			if (opts.yMin !== false && newY <= opts.yMin) newY = opts.yMin;
			if (opts.yMax !== false && newY >= opts.yMax) newY = opts.yMax;

			// populate position {}
			if (opts.horizontal) position.left = newX;
			if (opts.vertical) position.top = newY;

			// reposition $el
			opts.contain ? $el.css(position) : $el.offset(position);

			// trigger move event on object
			$el.trigger("move");
		}
	};

	// plugin definition
	$.fn.draggable = function(options){
		return this.each(function(){
			var target = $(this),
				data = target.data("draggable"),
				opts = $.extend({},$.fn.draggable.defaults,options);
			if (!data) {
				target.data("draggable", new Draggable(target, opts));
			}
		});
	};

	// plugin defaults
	$.fn.draggable.defaults = {
		cursor: "move",		// cursor type developer.mozilla.org/en-US/docs/CSS/cursor
		contain: true,		// contain within parent
		horizontal: true,	// draggable horizontally
		vertical: true,		// draggable vertically
		xMin: false,		// left boundary
		xMax: false,		// right boundary
		yMin: false,		// top boundary
		yMax: false			// bottom boundary
	};
}));
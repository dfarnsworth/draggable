(function($){
	// default
	$(".drag_target").draggable();
	// free
	$(".free_drag_target").draggable({
		contain: false
	});
	// vertical
	$(".vertical_drag_target").draggable({
		cursor: "ns-resize",
		horizontal: false
	});
	// horizontal
	$(".horizontal_drag_target").draggable({
		cursor: "ew-resize",
		vertical: false
	});

	// toggleable
	var active = true;
	var $toggle = $(".toggle_drag_target");
	$toggle.draggable();

	$(".toggle_full").on("click", toggleDraggable);

	function toggleDraggable(e) {
		e.preventDefault();
		if (active) {
			$toggle.trigger("dragremove");
			active = false;
		} else {
			$toggle.draggable();
			active = true;
		}
	}
})(jQuery);
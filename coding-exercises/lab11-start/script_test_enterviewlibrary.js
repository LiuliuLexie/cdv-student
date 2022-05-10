enterView({
	selector: '.textOne',
	enter: function(el) {
		// el.classList.add('entered');
    console.log("enter")
	},
	exit: function(el) {
		// el.classList.remove('entered');
    console.log("exit")
	},
	progress: function(el, progress) {
		// el.style.opacity = progress;
    console.log("progress")
	},
	offset: 0.5, // enter at middle of viewport
	// once: true, // trigger just once
});
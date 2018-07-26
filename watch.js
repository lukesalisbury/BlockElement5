var observer = new MutationObserver(function(mutations) {
	BlockAllVideos()
	mutations.forEach(function(mutation) {
		if ( mutation.type == "childList")
		{
			mutation.addedNodes.forEach(function(node) {
				if ( node instanceof HTMLVideoElement || node instanceof HTMLAudioElement )
				{
					blockMedia(node, true)
				}
				
			});
		}
	});
});


// Pause any dynamic added or started Video
document.addEventListener("DOMContentLoaded", function(event) {
	if ( document )
		observer.observe(document.body, {"childList": true, "subtree": true});
	//BlockAllVideos()
})

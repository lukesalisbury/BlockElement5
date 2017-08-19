var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		BlockAllVideos()
		if ( mutation.type == "childList")
		{
			mutation.addedNodes.forEach(function(node) {
				if ( node instanceof HTMLVideoElement)
				{
					console.log('video created', node)
					//blockVideo(node)
				}
				
			});
		}
	});
});


// Pause any dynamic added or started Video
document.addEventListener("DOMContentLoaded", function(event) {
	if ( document )
		observer.observe(document.body, {"childList": true, "subtree": false});
	//BlockAllVideos()
})

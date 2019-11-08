var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if ( mutation.type == "childList") {
			mutation.addedNodes.forEach(function(node) {
				if ( node instanceof HTMLVideoElement || node instanceof HTMLAudioElement ) {
					blockMedia(node, true)
				}
				
			});
		}
	});
});
//observer.observe(document.body, {'childList': true, 'subtree': true});
observer.observe(document, {'childList': true, 'subtree': true});






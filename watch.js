var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		BlockAllVideos()
	});
});

var observer2 = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		//console.log(mutation);
	});
});

// Pause any dynamic added or started Video
document.addEventListener("DOMContentLoaded", function(event) {
	observer.observe(document.body, {"childList": true, "subtree": false});
	//observer2.observe(document.getElementsByTagName('video'), {"attributes": true});

})
function blockMedia(mediaElement, dynamic = false) {
	mediaElement.removeAttribute('autoplay');
	mediaElement.setAttribute('preload', 'none');
	mediaElement.pause();
	if (!mediaElement.dataset.unblockElementId && !mediaElement.dataset.blockElementId) {
		mediaElement.addEventListener('play', watchForPlayEvent, true );
		mediaElement.addEventListener('playing', watchForPlayEvent, true );
		mediaElement.addEventListener('mouseover', unblockElement );
		if ( !mediaElement.hasAttribute('playsinline') ) {
			mediaElement.setAttribute('preload', 'metadata');
		} else {
			// playsinline - Likely used as background, so don't do a click to play 
			console.log('Disabled a media background', mediaElement, dynamic);
			mediaElement.setAttribute('preload', 'none');
		}
		mediaElement.dataset.blockElementId = 1;
	} 
	
};
function resetUnblockElement(mediaElement) {
	delete  mediaElement.dataset.unblockElementId;
}
function unblockElement(event) {
	event.target.dataset.unblockElementId = event.target.currentSrc;
}

function watchForPlayEvent(event) {
	event.preventDefault();
	if (!this.dataset.unblockElementId || this.dataset.unblockElementId != event.target.currentSrc) {
		this.pause()
	}
	return false;
}

function BlockAllMedia() {
	var nodes = document.querySelectorAll("video, audio");
	for(let i = 0; i < nodes.length; i++) {
		blockMedia(nodes[i])
	}
}


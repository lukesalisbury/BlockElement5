function blockMedia(mediaElement, dynamic = false) {
	if (!mediaElement.dataset.unblockElementId && !mediaElement.dataset.blockElementId) {
		if ( !mediaElement.paused ) {
			mediaElement.pause();
		}
		mediaElement.removeAttribute('autoplay')
		var parentSq = mediaElement.parentElement

		var clickToPlay = document.createElement('div');
		if (parentSq) {
			parentSq.replaceChild( clickToPlay, mediaElement );
		}
		

		if ( !mediaElement.hasAttribute('playsinline') ) {
			clickToPlay.addEventListener('click', unblockVideo, true);

			blockedmediaElements.push({ 'media': mediaElement, 'blocker': clickToPlay });

			clickToPlay.dataset.blockElementId = mediaElement.dataset.blockElementId = blockedmediaElements.length;

			clickToPlay.style.cssText = "border: 2px red dashed; background: #FFF8; color: black; text-align: center; cursor: pointer; box-sizing:border-box; top: 0; left: 0; height: 100%; width: 100%; padding-bottom: calc( 50% - 1em); z-index:10000;";
			clickToPlay.textContent = '▶'
		} else {
			// playsinline - Likely used as background, so don't do a click to play 
			console.log('Disabled a media background', mediaElement, parentSq, dynamic);
		}

	} 
	
};

function tryPlayingTheDamnVideo(mediaElement) {
	setTimeout(function () {
		// Youtube had issues
		if (mediaElement.paused) {
			var playPromise = mediaElement.play()
			if (playPromise !== undefined) {
				playPromise.then(function() {
					
				}).catch(function(error) {
					console.log('Media Can not be played. ' + error); 
					tryPlayingTheDamnVideo(mediaElement)
				});
			}
		}
	}, 1500);
}

function unblockVideo(event)
{
	if (event) 
		event.preventDefault();

	var parent = this.parentElement
	var videoid = parseInt(this.dataset.blockElementId )-1
	
	var mediaElement = blockedmediaElements[videoid].media
	if (mediaElement) {
		parent.replaceChild( mediaElement, this);
		mediaElement.dataset.unblockElementId = 1;
		tryPlayingTheDamnVideo(mediaElement)
	} else {
		parent.removeChild( this );
		console.log( 'mediaElement not found', videoid, blockedmediaElements);
	}

	return false
}

function watchForPlayEvent(event)
{
	if (!this.dataset.unblockElementId && !this.paused)
		this.pause()
	return false;
}

function BlockAllVideos()
{
	var nodes = document.querySelectorAll("video, audio");
	for(let i = 0; i < nodes.length; i++) {
		nodes[i].addEventListener('play', watchForPlayEvent );
		nodes[i].addEventListener('playing', watchForPlayEvent );
		blockMedia(nodes[i])
	}
}

blockedmediaElements = [];

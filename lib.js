function blockVideo(videoElement) {
	if (!videoElement.getAttribute('data-unblockid'))
	{
		var parent = videoElement.parentElement
		var parentSq = parent.parentElement
		var clickToPlay = document.createElement('div')

		videoElement.setAttribute('autoplay', 'false');
		if ( !videoElement.paused )
		{
			videoElement.pause()
		}

		blockedVideoElements.push(parent);

		clickToPlay.innerHTML = 'Click to Unblock'
		clickToPlay.setAttribute('data-id', blockedVideoElements.length );
		clickToPlay.style.cursor = 'pointer'
		clickToPlay.style.height = '100%'
		clickToPlay.style.textAlign = 'center'
		clickToPlay.style.zIndex = '666'
		clickToPlay.style.position = 'relative'
		parentSq.replaceChild( clickToPlay, parent );
		clickToPlay.addEventListener('click', unblockVideo, true);
	}

};

function unblockVideo(event)
{
	event.preventDefault();

	var parent = this.parentElement

	var video = this.getAttribute('data-id')-1
	
	parent.replaceChild( blockedVideoElements[video], this);

	blockedVideoElements[video].querySelector('video').setAttribute('data-unblockid', video );
	blockedVideoElements[video].querySelector('video').play()

	return false
}

function watchForPlayEvent(event)
{
	if (!this.getAttribute('data-unblockid'))
	{
		event.preventDefault();
		if ( !this.paused )
		{
			this.pause()
		}
	}
}

function BlockAllVideos()
{
	var nodes = document.getElementsByTagName("video");
	for(var i = 0; i < nodes.length; i++) {
		nodes[i].addEventListener('play', watchForPlayEvent );
		nodes[i].addEventListener('playing', watchForPlayEvent );
		blockVideo(nodes[i])
	}
}

blockedVideoElements = [];

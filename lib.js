function blockVideo(videoElement) {

	

	if (!videoElement.dataset.unblockElementId)
	{
		if ( !videoElement.paused )
		{
			videoElement.pause();
		}

		var parentSq = videoElement.parentElement
		var clickToPlay = document.createElement('div')

		clickToPlay.addEventListener('click', unblockVideo, true);

		videoElement.setAttribute('autoplay', 'false');

		parentSq.replaceChild( clickToPlay, videoElement );

		
		//var clone = videoElement.cloneNode(true); // Remove Events
		//clone.pause();
		//blockedVideoElements.push(clone);

		blockedVideoElements.push(videoElement);

		clickToPlay.dataset.blockElementId = blockedVideoElements.length;
		clickToPlay.textContent = '▶'
		clickToPlay.style.zIndex = '10000'
		clickToPlay.style.border = '2px red dashed'
		clickToPlay.style.backgroundColor = 'white'
		
		clickToPlay.style.color = 'black'
		clickToPlay.style.textAlign = 'center'
		clickToPlay.style.cursor = 'pointer'
		clickToPlay.style.boxSizing = 'border-box'
		//clickToPlay.style.position = 'fixed'
		clickToPlay.style.top = '0'
		clickToPlay.style.left = '0'

		clickToPlay.style.height = '100%'
		clickToPlay.style.width = '100%'
		clickToPlay.style.paddingBottom = 'calc( 50% - 1em)'
		clickToPlay.style.zIndex = 10000

		
		


	}
	
};

function tryPlayingTheDamnVideo(videoElement) {
setTimeout(function () {
			// Youtube had issues
			
			if (videoElement.paused) {
				var playPromise = videoElement.play()
				if (playPromise !== undefined) {
					playPromise.then(function() {
						
					}).catch(function(error) {
						console.log('Media Can not be played. ' + error); 
						//alert('Media Can not be played. ' + error); 
						//videoElement.dispatchEvent(new Event('ended'))
						tryPlayingTheDamnVideo(videoElement)
					});
				}
			}
		}, 1500);
}

function unblockVideo(event)
{

	if (event)
	{
		event.preventDefault();
	}
	
	

	var parent = this.parentElement
	var videoid = parseInt(this.dataset.blockElementId )-1
	
	var videoElement = blockedVideoElements[videoid]
	if (videoElement)
	{
		parent.replaceChild( videoElement, this);
		videoElement.dataset.unblockElementId = 1;
		tryPlayingTheDamnVideo(videoElement)
	
	}
	else {
		console.log( 'videoElement not found', videoid, blockedVideoElements);
	}

	return false
}

function watchForPlayEvent(event)
{

	if (!this.dataset.unblockElementId)
	{
		if ( !this.paused )
		{
			this.pause()
		}
	}
	else 
	{
		
	}

	return false;
}

function BlockAllVideos()
{
	var nodes = document.querySelectorAll("video, audio");
	for(var i = 0; i < nodes.length; i++) {

		
		//		nodes[i].addEventListener('click', watchForPlayEvent );
		nodes[i].addEventListener('play', watchForPlayEvent );
		nodes[i].addEventListener('playing', watchForPlayEvent );
		blockVideo(nodes[i])
	}
}

blockedVideoElements = [];

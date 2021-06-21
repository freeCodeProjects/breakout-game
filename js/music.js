//@ts-check
export default class Music {
	constructor() {
		this.audioControl = document.getElementById('audioControl')
		this.backgroundAudio = new Audio('./../audio/background.mp3')
		this.collisionAudio = new Audio('./../audio/collision.mp3')
		this.gameOverAudio = new Audio('./../audio/game-over.mp3')
		this.gameWinAudio = new Audio('./../audio/game-win.mp3')
		this.levelUpAudio = new Audio('./../audio/levelup.mp3')
		this.liveLostAudio = new Audio('./../audio/live-lost.mp3')
		this.initAudioControl()
	}

	initAudioControl() {
		this.backgroundAudio.loop = true

		this.backgroundAudio.addEventListener('timeupdate', function () {
			var buffer = 0.2
			if (this.currentTime > this.duration - buffer) {
				this.currentTime = 0
				this.play()
			}
		})

		this.audioControl.onclick = (event) => {
			if (event.currentTarget.checked) {
				this.backgroundAudio.play()
			} else {
				this.backgroundAudio.pause()
			}
			this.audioControl.blur()
		}
	}

	changeBackgroudVolume(duration) {
		this.backgroundAudio.volume = 0.25
		setTimeout(() => {
			this.backgroundAudio.volume = 1
		}, duration * 1000)
	}

	getAudioState() {
		// @ts-ignore
		return this.audioControl.checked
	}

	playCollisionAudio() {
		this.collisionAudio.currentTime = 0
		if (this.getAudioState()) {
			this.changeBackgroudVolume(this.collisionAudio.duration)
			this.collisionAudio.play()
		}
	}

	playGameOverAudio() {
		if (this.getAudioState()) {
			this.changeBackgroudVolume(this.gameOverAudio.duration)
			this.gameOverAudio.play()
		}
	}

	playGameWinAudio() {
		if (this.getAudioState()) {
			this.changeBackgroudVolume(this.gameWinAudio.duration)
			this.gameWinAudio.play()
		}
	}

	playLevelUpAudio() {
		if (this.getAudioState()) {
			this.changeBackgroudVolume(this.levelUpAudio.duration)
			this.levelUpAudio.play()
		}
	}

	playLiveLostAudio() {
		if (this.getAudioState()) {
			this.changeBackgroudVolume(this.liveLostAudio.duration)
			this.liveLostAudio.play()
		}
	}
}

//@ts-check
import {
	ball,
	paddle,
	bricks,
	canvasWidth,
	canvasHeight,
	init,
	message,
	ctx,
	music
} from './index.js'

let currLevel = 1
const levels = {
	1: { brickRows: 3, brickColumns: 10, duration: 16 },
	2: { brickRows: 4, brickColumns: 10, duration: 14 },
	3: { brickRows: 5, brickColumns: 10, duration: 12 },
	4: { brickRows: 5, brickColumns: 10, duration: 10 },
	5: { brickRows: 5, brickColumns: 10, duration: 8 }
}
let score = 0
let lives = 5
let totalRemovedBricks = 0
let play = false
let textColor = ''
let showMessage = false
let timerCount = 3
let levelUpInterval, renderGameInterval

const levelTag = document.getElementById('level')
const scoreTag = document.getElementById('score')
const livesTag = document.getElementById('lives')
const resetBtn = document.getElementById('reset')
const playOrPauseBtn = document.getElementById('playOrPause')

document.addEventListener('keydown', (e) => paddle.movePaddle(e))
document.addEventListener('keyup', () => paddle.stopPaddle())
document.addEventListener('keypress', (e) => {
	if (e.key === ' ') {
		playOrPauseGame()
	}
})

livesTag.innerHTML = '<img src="./images/heart.png" alt="heart logo" />'.repeat(
	lives
)

resetBtn.onclick = startOrResetGame
playOrPauseBtn.onclick = playOrPauseGame

function playOrPauseGame() {
	setShowMessage(false)
	setPlay(!play)
	playOrPauseBtn.blur()
}

function gameOver() {
	setPlay(false)
	dissablePlayOrPauseBtn(true)
	if (lives === 0) {
		message.setAndShowMessage(`Game Over. Your score is ${score}.`)
		music.playGameOverAudio()
	} else {
		message.setAndShowMessage(`You Won. Your score is ${score}.`)
		music.playGameWinAudio()
	}
}

function dissablePlayOrPauseBtn(value) {
	playOrPauseBtn.disabled = value
}

function dissableResetBtn(value) {
	resetBtn.disabled = value
}

export function setShowMessage(value) {
	showMessage = value
}

function setPlay(value) {
	if (!playOrPauseBtn.disabled) {
		play = value
		playOrPauseBtn.innerText = play ? 'Pause' : 'Play'
	}
}

export function setTextColor(value) {
	textColor = value
}

function updateScore(value) {
	score = value
	scoreTag.innerText = score.toString()
	if (value !== 0) {
		updateBricksRemoved()
	}
}

function updateLives(value) {
	lives = value
	if (lives === 0) {
		gameOver()
	}
	livesTag.innerHTML =
		'<img src="./images/heart.png" alt="heart logo" />'.repeat(lives)
}

function levelUpTimer() {
	//run the timer for 1.5s
	levelUpInterval = setInterval(() => {
		levelUpHelper()
		if (timerCount < 0) {
			removeLevelUpInterval()
		}
	}, 500)
}

function levelUpHelper() {
	dissablePlayOrPauseBtn(true)
	dissableResetBtn(true)
	message.setAndShowMessage(`Starting Level ${currLevel} in ${timerCount}`)
	timerCount -= 1
}

function removeLevelUpInterval() {
	clearInterval(levelUpInterval)
	timerCount = 3
	setShowMessage(false)
	dissablePlayOrPauseBtn(false)
	dissableResetBtn(false)
	setPlay(true)
}

function updateLevel(value) {
	if (value <= 5) {
		totalRemovedBricks = 0
		setPlay(false)
		currLevel = value
		levelTag.innerText = currLevel.toString()
		if (value > 1) {
			init()
			levelUpTimer()
			music.playLevelUpAudio()
		}
	} else {
		gameOver()
	}
}

function updateBricksRemoved() {
	totalRemovedBricks += 1
	if (
		totalRemovedBricks ===
		levels[currLevel]['brickRows'] * levels[currLevel]['brickColumns']
	) {
		updateLevel(currLevel + 1)
	}
}

export function ballCollisionWithPaddle() {
	const ballPos = ball.getPositionAndDimension()
	const paddlePos = paddle.getPositionAndDimension()

	const ballYPos = ballPos.y + ballPos.radius
	const ballXPos = ballPos.x
	const ballRadius = ballPos.radius

	const paddleMinXPos = paddlePos.x - ballRadius / 2
	const paddleMaxXPos = paddlePos.x + paddlePos.w + ballRadius / 2
	const paddleYPos = paddlePos.y

	if (
		ballPos.dy > 0 &&
		ballYPos > paddleYPos &&
		ballXPos > paddleMinXPos &&
		ballXPos < paddleMaxXPos
	) {
		ball.reverseYDirection()
		music.playCollisionAudio()
	}
}

export function ballCollisionWithBricks() {
	const bricksPos = bricks.getPositionAndDimension()
	const ballPos = ball.getPositionAndDimension()

	const ballXPos = ballPos.x
	const ballYPos = ballPos.y

	for (let brick of bricksPos) {
		if (brick.show) {
			const brickMinXPos = brick.x - ballPos.radius
			const brickMaxXPos = brick.x + brick.w + ballPos.radius
			const brickMinYPos = brick.y
			const brickMaxYPos = brick.y + brick.h

			if (
				ballXPos > brickMinXPos &&
				ballXPos < brickMaxXPos &&
				ballYPos > brickMinYPos &&
				ballYPos < brickMaxYPos
			) {
				ball.reverseYDirection()
				brick.show = false
				updateScore(score + 1)
				music.playCollisionAudio()
			}
		}
	}
}

export function ballCollisionWithWalls() {
	const ballPos = ball.getPositionAndDimension()

	//detect collision with sidewall
	if (
		ballPos.x + ballPos.radius > canvasWidth ||
		ballPos.x - ballPos.radius < 0
	) {
		ball.reverseXDirection()
	}

	//detect collision with top wall
	if (ballPos.y - ballPos.radius < 0) {
		ball.reverseYDirection()
	}

	//detect collision with bottom wall
	if (ballPos.y + ballPos.radius > canvasHeight) {
		//checking if ball moving towards bottom wall
		if (ballPos.dy > 0) {
			updateLives(lives - 1)
			ball.reverseYDirection()
			music.playLiveLostAudio()
		}
	}
}

//paint the game on canvas
export function drawGameUI() {
	//clear the canvas
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	setTextColor('rgb(64, 172, 60)')
	ctx.fillStyle = textColor
	ball.draw()
	ballCollisionWithWalls()
	ballCollisionWithPaddle()
	ballCollisionWithBricks()
	bricks.draw()
	paddle.draw()

	ball.updatePosition()
}

function updateGameUI() {
	renderGameInterval = setInterval(() => {
		if (play) {
			drawGameUI()
		}
	}, levels[currLevel]['duration'])
}

//remove the interval so that new duration can apply to setInterval when method 'updateGameUI' called next time
function removeRenderGameInterval() {
	clearInterval(renderGameInterval)
}

function startOrResetGame() {
	removeRenderGameInterval()
	updateLevel(1)
	updateScore(0)
	updateLives(5)
	setPlay(false)
	dissablePlayOrPauseBtn(false)
	init()
	updateGameUI()
	message.setAndShowMessage('Click Play to Start')
	resetBtn.blur()
}

export { play, levels, currLevel, textColor, showMessage, startOrResetGame }

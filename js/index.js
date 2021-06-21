//@ts-check
import Ball from './ball.js'
import Bricks from './bricks.js'
import Paddle from './paddle.js'
import Message from './message.js'
import { levels, currLevel, startOrResetGame, drawGameUI } from './engine.js'
import Music from './music.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvasWidth = canvas.width
const canvasHeight = canvas.height
const ballRadius = 10
const paddleWidth = 100
const paddleHeight = 10
let ball, paddle, bricks, message
const music = new Music()
let sidenav = document.querySelector('.sidenav')
let sidenavOverlay = document.querySelector('.sidenav-overlay')
const ruleBtn = document.querySelector('.btn--rule')
const closeSidenavBtn = document.querySelector('.close-icon')

ruleBtn.onclick = () => {
	openSidenav()
}

closeSidenavBtn.onclick = () => {
	closeSidenav()
}

sidenavOverlay.onclick = () => {
	closeSidenav()
}

function openSidenav() {
	sidenav.classList.add('open')
	sidenavOverlay.classList.add('open')
	document.body.style.overflowY = 'hidden'
}

function closeSidenav() {
	sidenav.classList.remove('open')
	sidenavOverlay.classList.remove('open')
	document.body.style.overflowY = 'scroll'
}

function init() {
	//generate a random x position for ball. It will make game non repetitive.
	const ballXPosition = Math.floor(
		Math.random() * (canvasWidth - 2 * ballRadius) + ballRadius
	)
	const ballDimension = {
		x: ballXPosition,
		y: canvasHeight + ballRadius,
		radius: ballRadius,
		dx: 5,
		dy: -4
	}
	const paddleDimension = {
		x: canvasWidth / 2 - paddleWidth / 2,
		y: canvasHeight - (paddleHeight + 10),
		w: paddleWidth,
		h: paddleHeight,
		speed: 7
	}
	ball = new Ball(
		ballDimension.x,
		ballDimension.y,
		ballDimension.radius,
		ballDimension.dx,
		ballDimension.dy
	)
	paddle = new Paddle(
		paddleDimension.x,
		paddleDimension.y,
		paddleDimension.w,
		paddleDimension.h,
		paddleDimension.speed
	)
	bricks = new Bricks(
		levels[currLevel]['brickRows'],
		levels[currLevel]['brickColumns']
	)
	message = new Message(40)
	drawGameUI()
}

startOrResetGame()

export {
	ball,
	bricks,
	paddle,
	message,
	canvasWidth,
	canvasHeight,
	ctx,
	init,
	music
}

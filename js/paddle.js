//@ts-check
import { canvasWidth, ctx } from './index.js'

export default class Paddle {
	constructor(x, y, w, h, speed) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.speed = speed
		this.dx = 0
	}

	draw() {
		this.x = this.x + this.dx

		//prevent paddle from moving out of view
		if (this.x + this.w > canvasWidth) {
			this.x = canvasWidth - this.w
		} else if (this.x < 0) {
			this.x = 0
		}

		ctx.fillRect(this.x, this.y, this.w, this.h)
	}

	movePaddle(e) {
		if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === '/') {
			this.dx = this.speed
		} else if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'z') {
			this.dx = this.speed * -1
		}
	}

	stopPaddle() {
		this.dx = 0
	}

	getPositionAndDimension() {
		return {
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h
		}
	}
}

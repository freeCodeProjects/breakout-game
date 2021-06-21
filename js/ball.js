//@ts-check
import { ctx } from './index.js'

export default class Ball {
	constructor(x, y, radius, dx, dy) {
		this.x = x
		this.y = y
		this.radius = radius
		this.dx = dx
		this.dy = dy
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fill()
	}

	updatePosition() {
		this.x += this.dx
		this.y += this.dy
	}

	reverseXDirection() {
		this.dx *= -1
	}

	reverseYDirection() {
		this.dy *= -1
	}

	getPositionAndDimension() {
		return {
			x: this.x,
			y: this.y,
			radius: this.radius,
			dy: this.dy,
			dx: this.dx
		}
	}
}

//@ts-check
import { ctx } from './index.js'

export default class Bricks {
	constructor(rows, columns) {
		this.bricks = []
		this.rows = rows
		this.columns = columns
		this.init()
	}

	init() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				this.bricks.push({
					x: 30 + 85 * j,
					y: 25 + 30 * i,
					w: 75,
					h: 20,
					show: 1
				})
			}
		}
	}

	draw() {
		for (let position of this.bricks) {
			if (position.show) {
				ctx.fillRect(position.x, position.y, position.w, position.h)
			}
		}
	}

	getPositionAndDimension() {
		return this.bricks
	}
}

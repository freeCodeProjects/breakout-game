//@ts-check
import { ctx, canvasWidth, canvasHeight } from './index.js'
import {
	textColor,
	setTextColor,
	showMessage,
	setShowMessage
} from './engine.js'

export default class Message {
	constructor(fontSize) {
		this.fontSize = fontSize
		this.text = 'random'
	}

	draw() {
		if (showMessage) {
			//delay is necessary so setAndShowMessage runs after drawGameUI function
			setTimeout(() => {
				//clear only text area in canvas
				ctx.clearRect(0, canvasHeight / 2 - 30, canvasWidth, 60)
				ctx.font = `bold ${this.fontSize}px serif`
				setTextColor('rgb(64, 13, 60)')
				ctx.fillStyle = textColor
				ctx.textBaseline = 'middle'
				ctx.textAlign = 'center'
				ctx.fillText(this.text, canvasWidth / 2, canvasHeight / 2)
				ctx.fillStyle = 'rgb(64, 172, 60)'
			}, 20)
		}
	}

	setAndShowMessage(value) {
		setShowMessage(true)
		this.text = value
		this.draw()
	}
}

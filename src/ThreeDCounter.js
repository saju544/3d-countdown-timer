const tempalte = document.querySelector('#threed-counter')

let isRegistered = false

export default class ThreeDCounter extends HTMLElement {
	#texts
	#textWrpers
	#upperText
	#lowerText
	#frontFlipText
	#backFlipText
	#currentValue
	#initialFontSize

	constructor(initialValue = '0', initialFontSize) {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.append(tempalte.content.cloneNode(true))
		this.#texts = [...root.querySelectorAll('.text')]
		this.#textWrpers = [...root.querySelectorAll('.text-wraper')]
		this.#upperText = this.#textWrpers[0].firstElementChild
		this.#lowerText = this.#textWrpers[3].firstElementChild
		this.#frontFlipText = this.#textWrpers[2].firstElementChild
		this.#backFlipText = this.#textWrpers[1].firstElementChild
		this.#currentValue = initialValue.toString()
		this.#initialFontSize = initialFontSize
	}

	connectedCallback() {
		this.#lowerText.textContent = this.#currentValue
		this.#frontFlipText.textContent = this.#currentValue
		this.#upperText.textContent = this.#currentValue
		this.#backFlipText.textContent = this.#currentValue

		if (this.#initialFontSize) {
			this.#texts.forEach((text) => {
				text.style.fontSize = this.#initialFontSize
			})
		}

		const textHeight = this.#texts[0].offsetHeight
		const textWidth = this.#texts[0].offsetWidth

		this.#textWrpers.forEach((tw) => {
			tw.style.height = `${textHeight / 2}px`
			tw.style.width = `${textWidth}px`
		})

		if (!isRegistered) {
			window.CSS?.registerProperty?.({
				name: '--angle',
				syntax: '<number>',
				inherits: true,
				initialValue: '0',
			})
			isRegistered = true
		}

		this.addEventListener('animationend', () => {
			this.style.animation = 'none'
			this.#lowerText.textContent = this.#currentValue
			this.#frontFlipText.textContent = this.#currentValue
		})
	}
	set(value) {
		value = value.toString()
		if (this.#currentValue === value) {
			return
		}
		this.#currentValue = value
		this.#upperText.textContent = this.#currentValue
		this.#backFlipText.textContent = this.#currentValue
		this.style.animation = 'flip 0.9s'
	}
}

customElements.define('threed-counter', ThreeDCounter)

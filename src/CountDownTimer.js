const template = document.querySelector('#countdown-timer')

export default class CountDownTimer extends HTMLElement {
	#hour
	#minute
	#second
	#initialTimer
	#secondValue
	#minuteValue
	#hourValue
	constructor(initialTimer = '00:00:00') {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.append(template.content.cloneNode(true))
		this.#hour = root.querySelector('.hours')
		this.#minute = root.querySelector('.minutes')
		this.#second = root.querySelector('.seconds')
		this.#initialTimer = initialTimer
		;[this.#secondValue, this.#minuteValue, this.#hourValue] =
			this.#initialTimer.split(':')
		if (!this.#hourValue) {
			this.#hour.remove()
		}
		if (!this.#minuteValue) {
			this.#minute.remove()
		}
	}

	connectedCallback() {}
}

customElements.define('countdown-timer', CountDownTimer)

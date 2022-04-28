const template = document.querySelector('#countdown-timer')

export default class CountDownTimer extends HTMLElement {
	#hour
	#minute
	#second
	#initialTimer
	#totalTimeInSeconds
	constructor(initialTimer = '24:00:00') {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.append(template.content.cloneNode(true))
		this.#hour = this.shadowRoot.querySelector('.hours')
		this.#minute = this.shadowRoot.querySelector('.minutes')
		this.#second = this.shadowRoot.querySelector('.seconds')
		this.#initialTimer = initialTimer
		this.#totalTimeInSeconds = 0
	}

	connectedCallback() {
		const timeArray = this.#initialTimer.split(':')
		if (timeArray.length < 3) {
			this.#hour.remove()
		}
		if (timeArray.length < 2) {
			this.#minute.remove()
		}

		timeArray.reverse().forEach((t, i) => {
			this.#totalTimeInSeconds += t * 60 ** i
		})

		this.#hour = this.shadowRoot.querySelector('.hours')
		this.#minute = this.shadowRoot.querySelector('.minutes')
		this.#second = this.shadowRoot.querySelector('.seconds')

		this.#update(this.#totalTimeInSeconds)
		this.#start()
	}

	#update(totalTimeInSeconds) {
		const hour = Math.floor(totalTimeInSeconds / 3600)
		const minute = Math.floor((totalTimeInSeconds - hour * 3600) / 60)
		const second = Math.floor(
			totalTimeInSeconds - (hour * 3600 + minute * 60)
		)

		const timeContainers = [this.#hour, this.#minute, this.#second]
		const times = [hour, minute, second]

		timeContainers.forEach((tc, i) => {
			if (tc) {
				const time = times[i] > 9 ? times[i].toString() : `0${times[i]}`
				tc.children[0].set(time[0])
				tc.children[1].set(time[1])
			}
		})
	}

	#start() {
		const startTime = document.timeline.currentTime
		const interval = setInterval(() => {
			const timeEscaped = Math.round(
				(document.timeline.currentTime - startTime) / 1000
			)
			if (timeEscaped === this.#totalTimeInSeconds) {
				clearInterval(interval)
			}

			this.#update(this.#totalTimeInSeconds - timeEscaped)
		}, 1000)
	}
}

customElements.define('countdown-timer', CountDownTimer)

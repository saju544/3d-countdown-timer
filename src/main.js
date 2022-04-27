import ThreeDCounter from './ThreeDCounter.js'

const tc = new ThreeDCounter(0, '20rem')

document.body.prepend(tc)

let count = 0

setInterval(() => {
	count++
	if (count > 9) {
		count = 0
	}
	tc.set(count)
}, 1000)

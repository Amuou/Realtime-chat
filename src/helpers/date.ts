
export function formatTime(time: number) {
	const date = new Date(time)
	const minutes = date.getMinutes()
	return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

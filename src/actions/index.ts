export function scrollToBottom(node: HTMLElement) {
	if (!node.parentElement) return

	node.parentElement.scrollTop =
		node.parentElement.scrollHeight - node.parentElement.clientHeight + node.parentElement.scrollTop
}

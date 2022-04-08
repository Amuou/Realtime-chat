<script lang="ts">
	import { scrollToBottom } from '$actions'
	import { formatTime } from '$helpers/date'
	import type { TChannel, TMessage } from '$types'

	import Avatar from './avatar.svelte'

	export let selectedChannel: TChannel
	export let message: TMessage

	$: messageText = message.text
	$: time = formatTime(message.createdAt)
	$: channelImage =
		selectedChannel.members.find((user) => user.id === +message.authorId)?.avatar ?? ''
</script>

<div
	use:scrollToBottom
	class="max-w-5/6 flex w-fit items-center space-x-2 rounded-xl bg-slate-200 py-2 pr-3"
>
	<Avatar image={channelImage} />
	<span class="break-all text-black">{messageText}</span>
	<span class="self-end text-sm text-gray-400">{time}</span>
</div>

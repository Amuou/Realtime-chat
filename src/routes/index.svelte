<script lang="ts">
	let msg = ''
	let messages: string[] = []

	function sendMessage() {
		messages = messages.concat(msg)
		msg = ''
	}
</script>

<div class="flex h-screen">
	<div class="m-4 flex w-1/6 flex-col rounded-sm bg-gray-400">
		<input class="my-4 w-11/12 self-center rounded-md p-2" type="text" placeholder="Find user" />
		<div class="mx-4 mb-4 flex h-full flex-col rounded-sm bg-gray-100 p-4">Channels</div>
	</div>
	<div class="my-4 flex w-5/6 flex-col">
		<div class="mb-6 h-[94%] rounded-sm bg-gray-100 p-4">
			{#each messages as message}
				<div>{message}</div>
			{/each}
		</div>
		<div class="align-center flex h-[6%] rounded-sm bg-gray-100 p-2">
			<input
				bind:value={msg}
				class="mr-4 w-full rounded-sm p-4"
				placeholder="Write a message..."
				type="text"
			/>
			<button on:click={sendMessage} class="btn h-full">Send</button>
		</div>
	</div>
</div>

<script lang="ts">
	import { F } from '@mobily/ts-belt'
	import io from 'socket.io-client'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	import { goto } from '$app/navigation'
	import Avatar from '$components/avatar.svelte'
	import Channel from '$components/channel.svelte'
	import Message from '$components/message.svelte'
	import Spinner from '$components/spinner.svelte'
	import { get, post } from '$helpers/fetch'
	import { channels, currentUser } from '$stores/user.store'
	import type { TChannel, TMessage, TUser } from '$types'

	const socket = io('http://localhost:3010')

	let msg = ''
	let selectedChannel: TChannel | null = null
	let pageReady = false
	let usersList: TUser[] = []

	onMount(async () => {
		get('user')
			.json<TUser | null>()
			.then((user) => {
				if (!user) goto('/signin')
				currentUser.set(user)
			})
			.then(fetchChannels)
			.then(() => {
				pageReady = true
			})
	})

	async function fetchChannels() {
		return await get('channels', { searchParams: { userId: $currentUser?.id ?? '' } })
			.json<TChannel[]>()
			.then(channels.set)
	}

	function searchUsersByName(e: Event) {
		const elem = e.target as HTMLInputElement
		if (elem.value === '') {
			usersList = []
			return
		}
		get('users', { searchParams: { name: elem.value } })
			.json<TUser[]>()
			.then((users) => {
				usersList = users.filter((user) => user.id !== $currentUser?.id)
			})
	}

	function sendMessage(event: KeyboardEvent | TouchEvent | MouseEvent) {
		if (msg.length < 1 || (event.type === 'keypress' && (event as KeyboardEvent).code !== 'Enter'))
			return
		socket.emit('send-message', {
			text: msg,
			authorId: $currentUser?.id,
			channelId: selectedChannel?.id,
		})
		msg = ''
	}

	async function createPersonalChannel(user: TUser) {
		await post('channels/create-personal', {
			json: { userId: $currentUser?.id, otherUserId: user.id },
		})
		await fetchChannels()
	}

	function handleSelectChannel(channel: TChannel) {
		selectedChannel = channel
	}

	socket.on('save-message', (messages: TMessage[]) => {
		if (!selectedChannel?.messages) return
		selectedChannel.messages = messages
	})
</script>

{#if pageReady}
	<div class="relative flex h-screen select-none">
		<div class="relative m-4 flex w-1/6 flex-col rounded-sm bg-gray-400 p-4">
			<div class="relative flex min-h-[100px] flex-col items-center justify-center space-y-2">
				{#if $currentUser}
					<span class="text-xl text-white">{$currentUser?.name}</span>
					<Avatar image={$currentUser?.avatar} />
				{/if}
			</div>
			<input
				class="my-4 rounded-md p-2"
				type="text"
				placeholder="Search"
				on:input={F.debounce(searchUsersByName, 500)}
			/>
			{#if usersList.length > 0}
				<div
					class="absolute top-[180px] left-[16px] z-10 flex h-fit w-full flex-row space-y-2 overflow-x-auto rounded-sm bg-gray-100"
					transition:fade
				>
					{#each usersList as user}
						<div
							on:click={() => createPersonalChannel(user)}
							class="flex flex-col items-center justify-center"
						>
							<Avatar image={user.avatar} />
							<span>{user.name}</span>
						</div>
					{/each}
				</div>
			{/if}
			<div class="flex h-full flex-col space-y-2 rounded-sm bg-gray-100">
				{#each $channels as channel}
					<Channel
						image={channel.image}
						name={channel.name}
						on:click={() => handleSelectChannel(channel)}
					/>
				{/each}
			</div>
		</div>
		<div class="my-4 flex w-5/6 flex-col">
			<div class="mb-6 h-[93%] space-y-3 overflow-y-auto rounded-sm bg-gray-100 p-4">
				{#if selectedChannel}
					{#each selectedChannel.messages as message}
						<Message {message} {selectedChannel} />
					{/each}
				{/if}
			</div>
			<div class="align-center flex h-[7%] rounded-sm bg-gray-100 p-2">
				<input
					bind:value={msg}
					on:keypress={sendMessage}
					class="mr-4 w-full p-4"
					placeholder="Write a message..."
					type="text"
				/>
				<button on:keypress={sendMessage} on:click={sendMessage} class="btn btn-md">Send</button>
			</div>
		</div>
	</div>
{:else}
	<Spinner />
{/if}

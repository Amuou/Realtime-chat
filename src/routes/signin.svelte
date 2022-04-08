<script lang="ts">
	import { goto } from '$app/navigation'
	import { post } from '$helpers/fetch'
	import type { TUser } from '$types'

	type TokenResponse = { access_token: string; user: TUser }

	let name = ''
	let password = ''
	let avatarUrl = ''
	let isSignIn = false

	function toggleView() {
		isSignIn = !isSignIn
		name = ''
		password = ''
		avatarUrl = ''
	}

	async function signUp() {
		const response: TokenResponse = await post('auth/signup', {
			json: { name, password, avatar: avatarUrl },
		}).json()
		saveToken(response)
	}

	async function signIn() {
		const response: TokenResponse = await post('auth/signin', {
			json: { name, password },
		}).json()
		saveToken(response)
	}

	function saveToken(response: TokenResponse) {
		const token = response?.access_token ?? ''
		localStorage.setItem('JWToken', token)
		if (token) goto('/')
	}
</script>

<div class="flex w-1/4 select-none flex-col items-center">
	{#if isSignIn}
		<input class="m-2 p-2" type="text" bind:value={name} placeholder="name" />
		<input class="m-2 p-2" type="password" bind:value={password} placeholder="Password" />
		<button class="btn" on:click={signIn}>Sign In</button>
		<span>Don't have the account? 
			<span class="cursor-pointer font-bold" on:click={toggleView}>Sign up</span>
		</span>
	{:else}
		<input class="m-2 p-2" type="text" bind:value={name} placeholder="name" />
		<input class="m-2 p-2" type="password" bind:value={password} placeholder="Password" />
		<input class="m-2 p-2" type="text" bind:value={avatarUrl} placeholder="Avatar URL" />
		<button class="btn" on:click={signUp}>Sign Up</button>
		<span
			>Already have the account?
			<span class="font-bold cursor-pointer" on:click={toggleView}>Sign in</span>
		</span>
	{/if}
</div>

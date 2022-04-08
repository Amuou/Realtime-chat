<script lang="ts">
	import Avatar from '$components/avatar.svelte'

	export let image: string
	export let name: string
</script>

<div class="menu flex-row flex hover:bg-gray-200 p-2" on:click>
	<Avatar {image} />
	<div class="flex flex-col justify-center">
		<span class="text-xl text-gray-700">{name}</span>
	</div>
</div>

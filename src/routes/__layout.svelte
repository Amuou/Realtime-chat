<script>
	import '../app.css'

	import { onMount } from 'svelte'

	import { goto } from '$app/navigation'

	onMount(() => {
		const isUserLogged = localStorage.getItem('JWToken')

		if (!isUserLogged) {
			goto('signin')
		} else {
			goto('/')
		}
	})
</script>

<slot />

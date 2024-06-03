<script>
	import Toasts from '$lib/toast/Toasts.svelte';
	import './app.css';
</script>

<Toasts position="bottom-0 left-0" />
<div class="flex flex-col">
	<slot />
</div>

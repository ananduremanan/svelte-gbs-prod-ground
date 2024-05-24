<script>
	import Toasts from '$lib/toast/Toasts.svelte';
	import './app.css';
</script>

<Toasts />
<div class="flex flex-col">
	<slot />
</div>

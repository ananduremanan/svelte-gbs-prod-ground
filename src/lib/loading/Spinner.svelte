<script>
	import Stroke from './Stroke.svelte';

	export let size = 'h-10 w-10';
	export let color = 'border-blue-600';
	export let fullCircleColor = 'border-t-red-400';
	export let dotColor = 'bg-blue-500';
	export let duration = 'duration-500';
	export let type = 'circle';
	export let strokeColor = 'stroke-blue-500';
</script>

{#if type === 'circle'}
	<div
		class={`loader ease-linear rounded-full border-4 border-t-4 ${color} ${size} ${duration} border-t-transparent animate-spin`}
	></div>
{:else if type === 'circle-bg'}
	<div class={`${size} animate-spin rounded-full border-4 ${fullCircleColor}`} />
{:else if type === 'dot'}
	<div class="flex space-x-2 dark:invert">
		<div class={`${size} ${dotColor} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
		<div class={`${size} ${dotColor} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
		<div class={`${size} ${dotColor} rounded-full animate-bounce`}></div>
	</div>
{:else if type === 'stroke'}
	<div aria-label="Loading..." role="status" class="flex space-x-2">
		<Stroke {size} {strokeColor} />
	</div>
{/if}

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { CircleCheck, X, CircleX, Info } from 'lucide-svelte';

	const dispatch = createEventDispatcher();

	export let type = 'error';
	export let dismissible = false;

	let textColor = 'bg-red-500';

	$: if (type) {
		switch (type) {
			case 'success':
				textColor = 'text-green-500';
				break;
			case 'info':
				textColor = 'text-blue-500';
				break;
			default:
				textColor = 'text-red-500';
				break;
		}
	}
</script>

<article
	class={`bg-white px-2 py-2 rounded-2xl text-sm flex justify-between w-40 md:w-80 m-2 border shadow-lg ${textColor}`}
	role="alert"
	transition:fade
>
	<div class="flex gap-2 items-center justify-center">
		{#if type === 'success'}
			<CircleCheck size="20" />
		{:else if type === 'error'}
			<CircleX size="20" />
		{:else if type === 'info'}
			<Info size="20" />
		{/if}
		<div class="text">
			<slot />
		</div>
	</div>

	{#if dismissible}
		<button
			class="close"
			on:click={() => {
				dispatch('dismiss');
			}}
		>
			<X size="20" />
		</button>
	{/if}
</article>

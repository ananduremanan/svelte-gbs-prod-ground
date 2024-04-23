<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let show = false;
	export let applyFilter = () => {};
	let filterValue = '';

	const onCancel = () => {
		dispatch('cancel');
	};
</script>

{#if show}
	<div class="absolute bg-gray-100 p-2 border z-10 mt-36 flex items-end flex-col shadow-lg">
		<input type="text" bind:value={filterValue} placeholder="Enter filter value" />
		<div class="mt-2">
			<button on:click={onCancel} class="text-xs bg-red-400 p-1 rounded-lg">Cancel</button>
			<button on:click={() => applyFilter()} class="text-xs bg-blue-400 p-1 rounded-lg"
				>Apply Filter</button
			>
		</div>
	</div>
{/if}

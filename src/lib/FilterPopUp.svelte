<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Select } from 'flowbite-svelte';

	const dispatch = createEventDispatcher();

	export let show = false;
	export let columnHeader = '';

	$: show;

	let filterValue: string = '';
	let selected: string = 'contains';
	let isFilterActive = false;

	let filterOptions = [
		{ value: 'contains', name: 'Contains' },
		{ value: 'starts_with', name: 'Starts With' },
		{ value: 'ends_with', name: 'Ends With' }
	];

	const onCancel = () => {
		dispatch('cancel');
	};

	const applyFilter = () => {
		dispatch('apply', { filterValue, selected, columnHeader });
		show = false;
		isFilterActive = true;
	};

	const clearFilter = () => {
		isFilterActive = false;
		dispatch('clearFilter', { columnHeader });
	};
</script>

{#if show}
	<div class="absolute bg-gray-100 p-2 border z-10 mt-40 flex items-end flex-col shadow-lg gap-2">
		<Select class="mt-2 text-sm" items={filterOptions} bind:value={selected} />
		<input
			type="text"
			bind:value={filterValue}
			placeholder="Enter filter value"
			class="rounded-lg p-2 text-sm"
		/>
		<div class="mt-2">
			<Button on:click={onCancel} class="text-xs bg-red-400 p-1 rounded-lg hover:bg-red-600"
				>Cancel</Button
			>
			{#if isFilterActive}
				<Button on:click={clearFilter} class="text-xs bg-blue-500 p-1 rounded-lg hover:bg-blue-600"
					>Clear Filter</Button
				>
			{/if}
			<Button on:click={applyFilter} class="text-xs bg-blue-500 p-1 rounded-lg hover:bg-blue-600"
				>Apply Filter</Button
			>
		</div>
	</div>
{/if}

<script lang="ts">
	import { tick } from 'svelte';
	import { cn } from '$lib/utils.js';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import X from 'lucide-svelte/icons/x';
	import { SearchOutline } from 'flowbite-svelte-icons';

	export let placeholder = 'Select a Value...';
	export let items: any[];
	export let selected: any[] = [];
	export let lazy: boolean = false;
	export let truncate: boolean = true;
	export let enableSelectAll: boolean = false;

	let showPopover = false;
	let popoverTrigger: any;
	let searchRef: any = null;
	let fullDataSource = [...items];
	let selectedDisplay: string = '';

	// Search handler function
	function inputSearchHandler(event: any) {
		if (!lazy) {
			items = fullDataSource.filter((item: any) => {
				for (const key in item) {
					if (item[key].toString().toLowerCase().includes(event.target.value.toLowerCase())) {
						return true;
					}
				}
				return false;
			});
		}
	}

	// This Function will Close The Item Select PopUp when clicked outside
	function handleClickOutside(event: any) {
		if (popoverTrigger && !popoverTrigger.contains(event.target)) {
			showPopover = false;
		}
	}

	// Function to toggle popover
	async function togglePopover() {
		showPopover = !showPopover;
		items = fullDataSource;
		if (showPopover) {
			await tick();
			searchRef.focus();
		}
	}

	// Function to handle selection of an item
	function handleSelect(value: any, label: string) {
		const index = selected.indexOf(value);
		if (index === -1) {
			selected = [...selected, value];
		} else {
			selected = selected.filter((item) => item !== value);
		}
		updateSelectedDisplay();
	}

	// Function to update the display of selected items
	function updateSelectedDisplay() {
		if (selected.length > 0) {
			const displayedItems = selected.slice(0, 3).map((value) => {
				const item = fullDataSource.find((item) => item.value === value);
				return item ? item.label : '';
			});
			selectedDisplay = displayedItems.join(', ');

			if (selected.length > 3 && truncate) {
				const remainingCount = selected.length - 3;
				selectedDisplay += `, +${remainingCount} more`;
			}
		} else {
			selectedDisplay = '';
		}
	}
</script>

<div>
	<div class="relative w-[200px]">
		<button
			class="flex items-center border px-4 py-2 w-[200px] justify-between rounded-lg font-medium text-sm"
			on:click|stopPropagation={togglePopover}
			bind:this={popoverTrigger}
		>
			<div>
				{#if selectedDisplay}
					{selectedDisplay}
				{:else}
					{placeholder}
				{/if}
			</div>
			<div class="flex items-center">
				{#if selectedDisplay}
					<button
						class="h-full flex items-center px-2 z-20"
						on:click={() => {
							selected = [];
							selectedDisplay = '';
						}}
					>
						<X class="h-4 w-4 opacity-50" />
					</button>
				{/if}
				<ChevronsUpDown class="ml-2 h-4 w-4 opacity-50" />
			</div>
		</button>
	</div>

	<!-- Item List Popover -->
	{#if showPopover}
		<div
			class="absolute w-[200px] h-[200px] border px-2 rounded-lg mt-[1px] overflow-y-auto scrollbar bg-white"
			bind:this={popoverTrigger}
		>
			<!-- Search Handler -->
			<div class="flex p-2 gap-1 items-center sticky top-0 bg-white border-b">
				<SearchOutline size="sm" class="text-gray-400" />
				<input
					on:input={inputSearchHandler}
					bind:this={searchRef}
					type="text"
					name="search"
					id="search"
					placeholder="Search a value"
					class="p-1 flex w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<!-- Mapped Items -->
			{#if items.length > 0}
				<div class="px-4 py-1 w-full rounded-lg mt-1 text-sm flex items-center">
					{#if enableSelectAll}
						<input type="checkbox" id="selectall" />
						<label for="selectall" class="ml-3">Select All</label>
					{/if}
				</div>
				{#each items as { value, label }}
					<button
						class="px-2 py-1 w-full text-left hover:bg-blue-100 gap-2 rounded-lg mt-1 text-sm flex items-center"
						on:click={() => handleSelect(value, label)}
					>
						<Check class={cn('mr-2 h-4 w-4', selected.includes(value) ? '' : 'text-transparent')} />
						{label}
					</button>
				{/each}
			{:else}
				<div class="text-sm text-center">No DataSource Found</div>
			{/if}
		</div>
	{/if}
</div>

<svelte:window on:click={handleClickOutside} />

<script lang="ts">
	import { tick } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import Check from '$lib/assets/icons/Check.svelte';
	import ChevronsUpDown from '$lib/assets/icons/ChevronsUpDown.svelte';
	import X from '$lib/assets/icons/X.svelte';
	import SearchOutline from '$lib/assets/icons/SearchOutline.svelte';

	export let placeholder = 'Select a Value...';
	export let items: any[];
	export let selected: any[] = [];
	export let lazy: boolean = false;
	export let truncate: boolean = true;
	export let enableSelectAll: boolean = false;
	export let multiselectClass: string = 'px-4 py-2 w-[200px] rounded-lg font-medium text-sm';
	export let popUpClass: string = 'w-[200px] h-auto px-2 rounded-lg bg-white';

	let showPopover = false;
	let popoverTrigger: any;
	let searchRef: any = null;
	let fullDataSource = [...items];
	let selectedDisplay: string = '';
	let selectAllChecked = false;
	let popoverPosition: string = 'bottom';

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
			setPopoverPosition();
		}
	}

	// Function to set popover position
	function setPopoverPosition() {
		const rect = popoverTrigger.getBoundingClientRect();
		const spaceAbove = rect.top;
		const spaceBelow = window.innerHeight - rect.bottom;
		popoverPosition = spaceBelow < 200 && spaceAbove > spaceBelow ? 'top' : 'bottom';
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

	function handleSelectAll() {
		selectAllChecked = !selectAllChecked;
		if (selectAllChecked) {
			selected = items.map((item: any) => item.value);
			updateSelectedDisplay();
		} else {
			selected = [];
			selectedDisplay = '';
		}
	}
</script>

<div {...$$restProps}>
	<div class="relative w-[200px] h-auto">
		<button
			class={twMerge(multiselectClass, 'flex items-center border justify-between')}
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
			class={twMerge(
				popUpClass,
				`absolute border mt-[1px] overflow-y-auto scrollbar z-50 ${popoverPosition === 'top' ? 'top-auto bottom-[100%]' : ''}`
			)}
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
				{#if enableSelectAll}
					<div class="px-4 py-1 w-full rounded-lg mt-1 text-sm flex items-center">
						<input
							type="checkbox"
							id="selectall"
							value={selectAllChecked}
							on:change={handleSelectAll}
						/>
						<label for="selectall" class="ml-3">Select All</label>
					</div>
				{/if}
				{#each items as { value, label }}
					<button
						class="px-2 py-1 w-full text-left hover:bg-blue-100 gap-2 rounded-lg mt-1 text-sm flex items-center"
						on:click={() => handleSelect(value, label)}
					>
						<Check
							class={twMerge('mr-2 h-4 w-4')}
							color={selected.includes(value) ? 'black' : ''}
						/>
						{label}
					</button>
				{/each}
			{:else}
				<div class="text-sm text-center">No Data Found</div>
			{/if}
		</div>
	{/if}
</div>

<svelte:window on:click={handleClickOutside} />

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/MultiSelect) for more information.
## Props
```javascript
let placeholder = 'Select a Value...';
let items: any[];
let selected: any[] = [];
let lazy: boolean = false;
let truncate: boolean = true;
let enableSelectAll: boolean = false;
```

## Usage
```svelte
<script lang="ts">import { countries } from "$lib/countries";
import { MultiSelect } from "@grampro/svelte-block";
let selected = void 0;
</script>

<div>
	<Select items={countries} bind:value={selected} />
</div>
```
-->

<style>
	.scrollbar::-webkit-scrollbar {
		margin-top: 20px;
		width: 5px;
		height: 10px;
	}

	.scrollbar::-webkit-scrollbar-track {
		border-radius: 100vh;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background: #dbeafe;
		border-radius: 100vh;
	}

	.scrollbar::-webkit-scrollbar-thumb:hover {
		background: #c0a0b9;
	}
</style>

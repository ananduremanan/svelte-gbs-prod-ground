<script lang="ts">
	import { tick } from 'svelte';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import X from 'lucide-svelte/icons/x';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import Check from 'lucide-svelte/icons/check';
	import { twMerge } from 'tailwind-merge';
	import { fade } from 'svelte/transition';

	export let placeholder = 'Select a Value...';
	export let items: any[];
	export let selected: any = '';
	export let lazy: boolean = false;
	export let showSearch: boolean = true;
	export let searchboxClass: string = 'p-1 flex rounded-md bg-transparent text-sm outline-none';
	export let popUpClass: string =
		'w-[200px] h-auto border px-2 rounded-lg mt-[1px] scrollbar bg-white z-50';
	export let itemClass: string = 'text-left hover:bg-blue-100 gap-2 rounded-lg mt-1 text-sm ';

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
</script>

<div>
	<div class="relative w-[200px]">
		<button
			class="flex items-center border px-4 py-2 w-[200px] justify-between rounded-lg font-medium text-sm"
			on:click|stopPropagation={togglePopover}
			bind:this={popoverTrigger}
		>
			{#if selectedDisplay}
				{selectedDisplay}
			{:else}
				{placeholder}
			{/if}
			<ChevronsUpDown class="ml-2 h-4 w-4 opacity-50" />
		</button>
		{#if selectedDisplay}
			<button
				class="absolute right-8 top-0 h-full flex items-center px-2 z-20"
				on:click={() => {
					selected = '';
					selectedDisplay = '';
				}}
			>
				<X class="h-4 w-4 opacity-50" />
			</button>
		{/if}
	</div>

	<!-- Item List Popover -->
	{#if showPopover}
		<div
			class={twMerge('absolute overflow-y-auto', popUpClass)}
			bind:this={popoverTrigger}
			transition:fade={{ duration: 100 }}
		>
			<!-- Search Handler -->
			{#if showSearch}
				<div class="flex p-2 gap-1 items-center sticky top-0 bg-white border-b">
					<SearchOutline size="sm" class="text-gray-400" />
					<input
						autocomplete="off"
						on:input={inputSearchHandler}
						bind:this={searchRef}
						type="text"
						name="search"
						id="search"
						placeholder="Search a value"
						class={twMerge(searchboxClass, 'w-full')}
						{...$$restProps}
					/>
				</div>
			{/if}

			<!-- Mapped Items -->
			{#if items.length > 0}
				{#each items as { value, label }}
					<button
						class={twMerge('flex items-center w-full px-2 py-1', itemClass)}
						on:click={() => {
							selected = value;
							selectedDisplay = label;
							showPopover = !showPopover;
						}}
					>
						<Check class={twMerge('mr-2 h-4 w-4', selected !== value && 'text-transparent')} />
						{label}</button
					>
				{/each}
			{:else}
				<div class="text-sm text-center">No DataSource Found</div>
			{/if}
		</div>
	{/if}
</div>

<svelte:window on:click={handleClickOutside} />

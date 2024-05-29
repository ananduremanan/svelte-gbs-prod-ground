<script lang="ts">
	import ArrowRightToBracketOutline from '../assets/icons/ArrowRightToBracketOutline.svelte';
	import DotsVerticalOutline from '../assets/icons/DotsVerticalOutline.svelte';
	import FloppyDiskAltOutline from '../assets/icons/FloppyDiskAltOutline.svelte';
	import PenOutline from '../assets/icons/PenOutline.svelte';
	import PlusOutline from '../assets/icons/PlusOutline.svelte';
	import TrashBinOutline from '../assets/icons/TrashBinOutline.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let showMobileEditToolbar: boolean = false;
	export let isEditModeActive: boolean;
</script>

<div class="sm:block flex flex-grow md:hidden ml-4 relative">
	<button
		on:click={() => {
			showMobileEditToolbar = !showMobileEditToolbar;
		}}
	>
		<DotsVerticalOutline size="sm" />
	</button>
	{#if showMobileEditToolbar}
		<div class="fixed flex flex-col bg-white px-4 py-1 shadow-sm text-sm">
			<button
				class="flex items-center gap-2 mb-2"
				on:click={() => {
					dispatch('edit', { mode: 'add' });
					showMobileEditToolbar = !showMobileEditToolbar;
					isEditModeActive = !isEditModeActive;
				}}><PlusOutline size="sm" />Add</button
			>
			<button class="flex items-center gap-2 mb-2"><PenOutline size="sm" />Edit</button>
			<button class="flex items-center gap-2 mb-2">
				<TrashBinOutline size="sm" />Delete
			</button>
			<button
				class={`flex items-center gap-2 mb-2 ${!isEditModeActive ? 'text-gray-500' : ''}`}
				disabled={!isEditModeActive}
				on:click={() => {
					dispatch('edit', { mode: 'update' });
					showMobileEditToolbar = !showMobileEditToolbar;
				}}
			>
				<FloppyDiskAltOutline size="sm" />Update
			</button>
			<button
				class="flex items-center gap-2 mb-2"
				on:click={() => {
					dispatch('edit', { mode: 'cancel' });
					showMobileEditToolbar = !showMobileEditToolbar;
				}}
			>
				<ArrowRightToBracketOutline size="sm" />Cancel
			</button>
		</div>
	{/if}
</div>
<div class="px-2 py-1 flex-grow hidden md:flex">
	<button
		class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-blue-400"
		on:click={() => {
			dispatch('edit', { mode: 'add' });
			isEditModeActive = !isEditModeActive;
		}}><PlusOutline size="sm" />Add</button
	>
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-blue-400"
		><PenOutline
			size="sm"
			on:click={() => {
				dispatch('edit', { mode: 'edit' });
			}}
		/>Edit</button
	>
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-red-400"
		><TrashBinOutline size="sm" />Delete</button
	>
	<button
		class={`px-2 rounded-lg bg-white flex items-center text-sm ${!isEditModeActive ? 'text-gray-500' : 'hover:text-blue-400'}`}
		on:click={() => {
			dispatch('edit', { mode: 'update' });
		}}
		disabled={!isEditModeActive}><FloppyDiskAltOutline size="sm" />Update</button
	>
	<button
		class={`px-2 rounded-lg bg-white flex items-center text-sm ${!isEditModeActive ? 'text-gray-500' : 'hover:text-blue-400'}`}
		on:click={() => {
			dispatch('edit', { mode: 'cancel' });
		}}
		disabled={!isEditModeActive}><ArrowRightToBracketOutline size="sm" />Cancel</button
	>
</div>

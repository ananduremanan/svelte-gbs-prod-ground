<script lang="ts">
	import {
		ArrowRightToBracketOutline,
		DotsVerticalOutline,
		FloppyDiskAltOutline,
		PenOutline,
		PlusOutline,
		TrashBinOutline
	} from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let showMobileEditToolbar: boolean = false;
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
			<button class="flex items-center gap-2 mb-2"><PlusOutline size="sm" />Add</button>
			<button class="flex items-center gap-2 mb-2"><PenOutline size="sm" />Edit</button>
			<button class="flex items-center gap-2 mb-2">
				<TrashBinOutline size="sm" />Delete
			</button>
			<button class="flex items-center gap-2 mb-2">
				<FloppyDiskAltOutline size="sm" />Update
			</button>
			<button
				class="flex items-center gap-2 mb-2"
				on:click={() => {
					showMobileEditToolbar = !showMobileEditToolbar;
				}}
			>
				<ArrowRightToBracketOutline size="sm" />Cancel
			</button>
		</div>
	{/if}
</div>
<div class="px-2 py-1 flex-grow hidden md:flex">
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-blue-400"
		><PlusOutline size="sm" />Add</button
	>
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-blue-400"
		><PenOutline
			size="sm"
			on:click={() => {
				dispatch('edit', { edit: true });
			}}
		/>Edit</button
	>
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-red-400"
		><TrashBinOutline size="sm" />Delete</button
	>
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-blue-400"
		><FloppyDiskAltOutline size="sm" />Update</button
	>
	<button class="px-2 rounded-lg bg-white flex items-center text-sm hover:text-blue-400"
		><ArrowRightToBracketOutline size="sm" />Cancel</button
	>
</div>

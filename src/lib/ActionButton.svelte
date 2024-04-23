<script lang="ts">
	import { InfoCircleSolid, TrashBinSolid } from 'flowbite-svelte-icons';

	export let rowData: any;
</script>

<div class="flex gap-2">
	<button
		class="p-1 flex items-center bg-blue-300 rounded-xl"
		on:click={() => console.log('Edit', rowData)}><InfoCircleSolid /></button
	>
	<button
		class="p-1 flex items-center bg-red-300 rounded-xl"
		on:click={() => console.log('Delete', rowData)}><TrashBinSolid /></button
	>
</div>

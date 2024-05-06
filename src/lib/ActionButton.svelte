<script lang="ts">
	import { InfoCircleSolid, TrashBinSolid } from 'flowbite-svelte-icons';

	export let rowData: any;
</script>

<div class="flex gap-2">
	<button class="p-1 flex items-center rounded-xl" on:click={() => console.log('Edit', rowData)}
		><InfoCircleSolid color="blue" /></button
	>
	<button class="p-1 flex items-center rounded-xl" on:click={() => console.log('Delete', rowData)}
		><TrashBinSolid color="red" /></button
	>
</div>

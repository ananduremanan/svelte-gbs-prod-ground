<script lang="ts">
	import Button from './button/Button.svelte';

	export let rowData: any;
	export let rowIndex: number;

	function addData() {
		console.log(rowIndex);
	}
</script>

<div class="flex gap-2">
	<Button outline on:click={addData}>Save</Button>
	<Button outline>Cancel</Button>
</div>

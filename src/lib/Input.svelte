<script>
	import TextInput from './textinput/TextInput.svelte';
	export let rowIndex;
	export let rowData;
</script>

<TextInput placeholder="Enter Remarks" id={`gbs-${rowIndex}`} bind:value={rowData.remarks} />

<script>
	import TextInput from './textinput/TextInput.svelte';
	export let rowIndex;
</script>

<TextInput placeholder="Enter Remarks" id={rowIndex} />

<script lang="ts">
	import { countries } from '$lib/countries';
	import Select from '$lib/dropdown/Select.svelte';

	let selected: any = undefined;
</script>

<div>
	<Select items={countries} bind:value={selected} />

	{#if selected}
		<div>Selected Value is {selected}</div>
	{/if}
</div>

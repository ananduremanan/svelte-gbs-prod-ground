<script lang="ts">
	import SelectRestructured from '$lib/dropdown/SelectRestructured.svelte';
	import MultiSelect from '$lib/multiselect/MultiSelect.svelte';
	import { items } from '../utils/componentData';

	let countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'fr', label: 'France' },
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'au', label: 'Australia' },
		{ value: 'cn', label: 'China' },
		{ value: 'in', label: 'India' },
		{ value: 'mx', label: 'Mexico' }
	];

	let selected: any;
</script>

<div class="min-h-screen relative">
	<MultiSelect items={countries} bind:selected />
	<SelectRestructured items={countries} bind:selected />
</div>

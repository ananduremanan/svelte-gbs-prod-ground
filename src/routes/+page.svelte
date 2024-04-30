<script lang="ts">
	import { countries } from '$lib/countries';
	// import Select from '$lib/dropdown/Select.svelte';
	import Grid from '$lib/Grid.svelte';
	import { dataSource } from '$lib/dataSource';
	import ActionButton from '$lib/ActionButton.svelte';
	import SelectShad from '$lib/dropdown/SelectShad.svelte';
	import SelectRestructured from '$lib/dropdown/SelectRestructured.svelte';
	import Select from '@grampro/svelte-block/Select.svelte';

	const columns = [
		{ field: 'OrderID', width: '200', textAlign: 'Right', filter: true },
		{ field: 'CustomerID', width: '100' },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{ field: 'Freight', headerText: 'Freight', width: '200' },
		{ field: 'ShipCountry', width: '200', clipMode: 'EllipsisWithTooltip', filter: true },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'ShipPostalCode', width: '150' },
		{ field: 'Grid Action', template: ActionButton }
	];

	let selected: any = undefined;
</script>

<div class="flex flex-col gap-4 px-20 py-8">
	<!-- <Select items={countries} bind:selected /> -->
	<SelectRestructured items={countries} bind:selected />

	<Grid {columns} {dataSource} pageSettings={{ pageNumber: 10 }} enableSearch />
</div>

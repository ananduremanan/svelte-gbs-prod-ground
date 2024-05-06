<script lang="ts">
	import { countries } from '$lib/countries';
	import Grid from '@grampro/svelte-block/Grid.svelte';
	import Select from '@grampro/svelte-block/Select.svelte';
	// import MultiSelect from '@grampro/svelte-block/MultiSelect.svelte';
	import { dataSource } from '$lib/dataSource';
	import ActionButton from '$lib/ActionButton.svelte';

	import Button from '$lib/button/Button.svelte';
	// import SelectRestructured from '$lib/dropdown/SelectRestructured.svelte';
	import MultiSelect from '$lib/multiselect/MultiSelect.svelte';
	// import Grid from '$lib/Grid.svelte';

	const columns = [
		{ field: 'OrderID', width: '200', textAlign: 'Right', filter: true },
		{ field: 'CustomerID', width: '100' },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{ field: 'Freight', headerText: 'Freight', width: '200' },
		{ field: 'ShipCountry', width: '200', filter: true },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'ShipPostalCode', width: '150' },
		{ field: 'Grid Action', template: ActionButton }
	];

	let selected: any = undefined;
</script>

<div class="flex flex-col gap-4 px-20 py-8">
	<div class="flex gap-2">
		<Select items={countries} bind:selected />
		<MultiSelect items={countries} placeholder="Select Multiple Values" enableSelectAll />
		<Button>Submit</Button>
	</div>

	<Grid
		{columns}
		{dataSource}
		pageSettings={{ pageNumber: 10 }}
		enableSearch
		enableExcelExport
		enablePdfExport
		excelName="export_data_excel"
		pdfName="export_pdf_data"
	/>
</div>

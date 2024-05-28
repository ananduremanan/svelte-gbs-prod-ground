<script>
	import Grid from '$lib/grid/Grid2.0.svelte';
	import { dataSource } from '$lib/dataSource';

	const columns = [
		{ field: 'OrderID', width: '200', textAlign: 'Right' },
		{ field: 'ShipCountry', width: '200', editable: true },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'ShipName', width: '150' },
		{ field: 'ShipCity', width: '150' },
		{ field: 'ShipRegion', width: '150' },
		{ field: 'ShipPostalCode', width: '150' },
		{ field: 'OrderDate', width: '150' },
		{ field: 'Verified', width: '150' }
	];
</script>

<div class="mx-8 mt-8 max-sm:mx-4">
	<Grid
		{columns}
		{dataSource}
		pageSettings={{ pageNumber: 10 }}
		pdfOptions={{ layout: 'portrait', paperSize: 'a3' }}
		enableSearch
		enablePdfExport
		enableExcelExport
	/>
</div>

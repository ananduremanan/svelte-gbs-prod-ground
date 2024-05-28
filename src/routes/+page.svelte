<script>
	import Grid from '$lib/grid/Grid2.0.svelte';
	import { dataSource } from '$lib/dataSource';

	const columns = [
		{ field: 'OrderID', textAlign: 'Right' },
		{ field: 'ShipCountry', editable: true },
		{ field: 'ShipAddress' },
		{ field: 'ShipName' },
		{ field: 'ShipCity' },
		{ field: 'ShipRegion' },
		{ field: 'ShipPostalCode' },
		{ field: 'OrderDate' },
		{ field: 'Verified' }
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

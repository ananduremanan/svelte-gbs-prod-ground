<script>
	import Grid from '$lib/Grid2.0.svelte';
	import { dataSource } from '$lib/dataSource';

	const columns = [
		{ field: 'OrderID', width: '200', textAlign: 'Right' },
		{ field: 'CustomerID', width: '100', filter: true },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{
			field: 'Freight',
			headerText: 'Frieght',
			width: '200'
		},
		{ field: 'ShipCountry', width: '200' },
		{ field: 'ShipAddress', width: '150' }
	];
</script>

<div class="mx-8 mt-8">
	<Grid {columns} {dataSource} pageSettings={{ pageNumber: 10 }} enableSearch />
</div>

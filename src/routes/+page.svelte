<script lang="ts">
	import Grid2 from '$lib/Grid2.0.svelte';
	import { dataSource } from '$lib/dataSource';
	import ActionButton from '$lib/ActionButton.svelte';

	const columns = [
		{ field: 'OrderID', width: '200', textAlign: 'Right', filter: true },
		{ field: 'CustomerID', width: '100' },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{ field: 'Freight', headerText: 'Frieght', width: '200' },
		{ field: 'ShipCountry', width: '200', clipMode: 'EllipsisWithTooltip', filter: true },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'ShipPostalCode', width: '150' },
		{ field: 'Grid Action', template: ActionButton }
	];
</script>

<div class="px-20 py-10">
	<Grid2 {columns} {dataSource} pageSettings={{ pageNumber: 10 }} enableExcelExport enableSearch />
</div>

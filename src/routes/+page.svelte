<script lang="ts">
	import Grid from '$lib/Grid.svelte';
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

<Grid {columns} {dataSource} pageSettings={{ pageNumber: 10 }} enableSearch />

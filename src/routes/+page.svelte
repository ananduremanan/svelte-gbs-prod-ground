<script lang="ts">
	import Grid2 from '$lib/grid/Grid2.0.svelte';
	import Input from '$lib/Input.svelte';
	import SerialNumber from '$lib/SerialNumber.svelte';
	import dataStore from '../store';

	let dataSource: any[] = [];
	dataStore.subscribe((data: any) => {
		dataSource = data;
	});

	const columns = [
		{ field: 'Sl. No', width: '80', textAlign: 'Right', template: SerialNumber },
		{ field: 'OrderID', width: '100', textAlign: 'Right' },
		{ field: 'CustomerID', width: '100' },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{ field: 'Freight', headerText: 'Frieght', width: '100' },
		{ field: 'ShipCountry', width: '100' },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'Remarks', headerText: 'Remarks', template: Input, width: '200' }
	];
</script>

<div class="m-4">
	<Grid2 {columns} {dataSource} pageSettings={{ pageNumber: 10 }} />
</div>

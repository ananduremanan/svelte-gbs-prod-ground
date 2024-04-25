<script lang="ts">
	// import Grid from '@grampro/svelte-block/Grid.svelte';
	import Grid from '$lib/Grid.svelte';
	// import { dataSource } from '$lib/dataSource';
	import ActionButton from '$lib/ActionButton.svelte';
	import users from '$lib/users.json';

	const columns = [
		{ field: 'id', width: '200', textAlign: 'Right', headerText: 'ID', filter: true },
		{ field: 'name', width: '100', headerText: 'Name' },
		{ field: 'city', width: '100', textAlign: 'Right', headerText: 'City' },
		{ field: 'age', headerText: 'Frieght', width: '200', filter: true },
		{ field: 'Grid Action', template: ActionButton }
	];
</script>

<Grid {columns} dataSource={users} pageSettings={{ pageNumber: 10 }} />

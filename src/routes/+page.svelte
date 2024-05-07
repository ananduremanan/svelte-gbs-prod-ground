<script lang="ts">
	import { onMount } from 'svelte';
	import { countries } from '$lib/countries';
	// import Grid from '@grampro/svelte-block/Grid.svelte';
	import Select from '@grampro/svelte-block/Select.svelte';
	// import MultiSelect from '@grampro/svelte-block/MultiSelect.svelte';
	import { dataSource } from '$lib/dataSource';
	import ActionButton from '$lib/ActionButton.svelte';
	import ImageAction from '$lib/ImageAction.svelte';

	import Button from '$lib/button/Button.svelte';
	// import SelectRestructured from '$lib/dropdown/SelectRestructured.svelte';
	import MultiSelect from '$lib/multiselect/MultiSelect.svelte';
	import Grid from '$lib/Grid.svelte';
	import { Img, Spinner } from 'flowbite-svelte';

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

	const gitDataColumns: any[] = [
		{ field: 'id', width: '200', textAlign: 'Right', filter: true },
		{
			field: 'imgUrl',
			width: '200',
			textAlign: 'Right',
			template: ImageAction,
			showTemplateInExport: true
		},
		{ field: 'userName', width: '100' },
		{ field: 'repo', width: '100', textAlign: 'Right' },
		{ field: 'repoUrl', headerText: 'Repo URL', width: '200' },
		{ field: 'Grid Action', template: ActionButton }
	];

	let selected: any = undefined;

	const getData = async () => {
		let dataArray = [];
		try {
			const res = await fetch(
				'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json'
			);
			const data = await res.json();
			if (data) {
				dataArray = data.map((item: any) => {
					return {
						id: item.id,
						userName: item.actor.login,
						repo: item.repo.name,
						repoUrl: item.repo.url,
						imgUrl: item.actor.avatar_url
					};
				});
			}

			return dataArray;
		} catch (error) {
			console.error(error);
		}
	};

	let gitData: any[] = [];

	onMount(async () => {
		gitData = await getData();
	});
</script>

<div class="flex flex-col gap-4 px-20 py-8">
	<div class="flex gap-2">
		<Select items={countries} bind:selected />
		<MultiSelect items={countries} placeholder="Select Multiple Values" enableSelectAll />
		<Button>Submit</Button>
	</div>

	{#if gitData}
		<Grid
			columns={gitDataColumns}
			dataSource={gitData}
			pageSettings={{ pageNumber: 10 }}
			enableSearch
		/>
	{/if}
</div>

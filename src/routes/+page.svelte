<script lang="ts">
	import { onMount } from 'svelte';
	import Grid2 from '$lib/grid/Grid2.0.svelte';
	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/Input.svelte';

	let gridRef: any;
	let isFetching = false;

	function clickInstance() {
		if (gridRef) {
			gridRef.goToPage(2);
		}
	}

	const gitDataColumns = [
		{ field: 'id', width: '200', textAlign: 'Right', filter: true },
		{
			field: 'imgUrl',
			width: '200',
			textAlign: 'Right',
			showTemplateInExport: true
		},
		{ field: 'userName', width: '100', filter: true },
		{ field: 'repo', width: '100', textAlign: 'Right' },
		{ field: 'repoUrl', headerText: 'Repo URL', width: '200' },
		{ field: 'remarks', headerText: 'Remarks', width: '200', template: Input, mandatory: true }
	];
	const getData = async () => {
		let dataArray = [];
		try {
			isFetching = true;
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
		} finally {
			isFetching = false;
		}
	};
	let gitData: any = [];
	onMount(async () => {
		gitData = await getData();
	});
</script>

<div class="flex flex-col gap-4 px-20 py-8">
	<div>
		<Button on:click={clickInstance} outline class="hover:bg-black">Go To Grid Page 3</Button>
	</div>
	<Grid2
		columns={gitDataColumns}
		dataSource={gitData}
		pageSettings={{ pageNumber: 10 }}
		enableSearch
		enablePdfExport
		pdfName="win-data"
		bind:this={gridRef}
		{isFetching}
	/>
</div>

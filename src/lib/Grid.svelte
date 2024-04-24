<script lang="ts">
	import { AngleLeftOutline, AngleRightOutline, FilterOutline } from 'flowbite-svelte-icons';
	import FilterPopUp from './FilterPopUp.svelte';
	import { type PageSettingsProps } from './GridTypes';

	// Props To Grid Component
	export let dataSource: any[];
	export let columns: any[];
	export let pageSettings: PageSettingsProps;

	// $: dataSource;
	// $: columns;

	let fullDataSource = [...dataSource];

	// Added an additional column to show filter menu popup for each Column
	columns = columns.map((column) => ({ ...column, showFilterPopup: false, isFilterActive: false }));

	let currentPage = 0;
	let pageStart = 0;
	let pageEnd = 10;

	// Total Number Of Pages
	const totalPages = Math.ceil(dataSource.length / pageSettings.pageNumber);

	// Function For Filtering Data Source
	function handleApplyFilter(event: any) {
		console.log(event);
		let filterValue = event.detail.filterValue.toLowerCase();
		let filterCondition = event.detail.selected;
		let filterColumn = event.detail.columnHeader;

		columns = columns.map((column: any) => {
			if (column.field === filterColumn) {
				return { ...column, isFilterActive: true, showFilterPopup: false };
			}
			return column;
		});

		dataSource = fullDataSource.filter((item: any) => {
			let columnValue = item[filterColumn].toString().toLowerCase();

			switch (filterCondition) {
				case 'contains':
					return columnValue.includes(filterValue);
				case 'equals':
					return columnValue === filterValue;
				default:
					return true;
			}
		});
	}

	// Function For Clearing the Filter
	function clearFilter(event: any) {
		let filterColumn = event.detail.columnHeader;
		columns = columns.map((column: any) => {
			if (column.field === filterColumn) {
				return { ...column, isFilterActive: true, showFilterPopup: false };
			}
			return column;
		});
	}

	function nextPage() {
		if (currentPage < totalPages - 1) {
			currentPage++;
			if (currentPage >= pageEnd) {
				pageStart += 10;
				pageEnd += 10;
			}
		}
	}

	function prevPage() {
		if (currentPage > 0) {
			currentPage--;
			if (currentPage < pageStart) {
				pageStart -= 10;
				pageEnd -= 10;
			}
		}
	}

	function goToPage(page: number): void {
		currentPage = pageStart + page;
	}
</script>

<div class="flex flex-col">
	{#if dataSource}
		{#if columns}
			<table>
				<thead>
					<tr>
						{#each columns as columnHeader}
							<th class="border p-2">
								<div class="flex items-center gap-2">
									{columnHeader.field}
									<!-- Filter Logic -->
									{#if columnHeader.filter && !columnHeader.template}
										<button
											on:click={() =>
												(columnHeader.showFilterPopup = !columnHeader.showFilterPopup)}
											><FilterOutline
												size="xs"
												class={`${columnHeader.isFilterActive ? 'text-red-400' : ''}`}
											/></button
										>
										<!-- Filter Pop Up Component For Showing Filtering Options -->
										<FilterPopUp
											bind:show={columnHeader.showFilterPopup}
											on:cancel={(event) => {
												if (event.type === 'cancel') {
													columnHeader.showFilterPopup = !columnHeader.showFilterPopup;
												}
											}}
											on:apply={handleApplyFilter}
											bind:columnHeader={columnHeader.field}
											on:clearFilter={clearFilter}
										/>
									{/if}
								</div>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<!-- Data From Datsource Shows Here -->
					{#if dataSource.length > 0}
						{#each dataSource.slice(currentPage * pageSettings.pageNumber, (currentPage + 1) * pageSettings.pageNumber) as rowData}
							<tr>
								{#each columns as column}
									{#if column.template}
										<td class="border p-2 flex justify-center"
											><svelte:component this={column.template} {rowData} /></td
										>
									{:else}
										<td class="border p-2">{rowData[column.field]}</td>
									{/if}
								{/each}
							</tr>
						{/each}
					{:else}
						<tr>
							<td colspan={columns.length} class="border p-2 text-center">No Data Found</td>
						</tr>
					{/if}
				</tbody>
			</table>
			<!-- Pagination Pages -->
			<div class="flex border p-2 justify-between">
				<div class="flex gap-4">
					<button on:click={prevPage}
						><AngleLeftOutline class={`${currentPage === 0 ? 'text-gray-200' : ''}`} /></button
					>
					<div class="flex flex-row gap-3 items-center">
						{#each Array(Math.min(10, Math.ceil(dataSource.length / pageSettings.pageNumber) - pageStart)) as _, i}
							<button
								on:click={() => goToPage(i)}
								class={`${pageStart + i === currentPage ? 'font-bold text-white p-1 w-6 h-6 bg-blue-500 flex items-center justify-center rounded-full' : ''}`}
								>{pageStart + i + 1}</button
							>
						{/each}
						{#if pageEnd < Math.ceil(dataSource.length / pageSettings.pageNumber)}
							<button class="p-1 w-5 h-5 flex items-center justify-center rounded-full">...</button>
						{/if}
					</div>
					<button on:click={nextPage}
						><AngleRightOutline
							class={`${currentPage === totalPages - 1 ? 'text-gray-200' : ''}`}
						/></button
					>
				</div>

				<!-- Shows Total Pages and Items In Grid -->
				<div class="flex">
					{currentPage + 1} of {totalPages} pages ({dataSource.length} items)
				</div>
			</div>
		{/if}
	{/if}
</div>

<script lang="ts">
	import { AngleLeftOutline, AngleRightOutline, FilterOutline } from 'flowbite-svelte-icons';
	import FilterPopUp from './FilterPopUp.svelte';
	import { type PageSettingsProps } from './GridTypes';
	import { handleApplyFilterHelper, clearFilterHelper } from './GridHelperFunctions';
	import { Search } from 'flowbite-svelte';

	// Props To Grid Component
	export let dataSource: any[];
	export let columns: any[];
	export let pageSettings: PageSettingsProps;
	export let enableSearch = false;
	export let gridHeight: number = 72;
	export let lazy: boolean = false;

	let currentPage = 0;
	let pageStart = 0;
	let pageEnd = 10;
	let fullDataSource = [...dataSource];

	// Total Number Of Pages
	const totalPages = Math.ceil(dataSource.length / pageSettings.pageNumber);

	// Added an additional column to show filter menu popup for each Column
	columns = columns.map((column) => ({ ...column, showFilterPopup: false, isFilterActive: false }));

	function handleSearch(event: any) {
		if (!lazy) {
			dataSource = fullDataSource.filter((item: any) => {
				for (const key in item) {
					if (item[key].toString().toLowerCase().includes(event.target.value.toLowerCase())) {
						return true;
					}
				}
				return false;
			});
		}
	}

	// Filtering Helper Methods
	function handleApplyFilter(event: any) {
		const { columns: updatedColumns, dataSource: updatedDataSource } = handleApplyFilterHelper(
			event,
			columns,
			dataSource,
			fullDataSource
		);
		columns = updatedColumns;
		dataSource = updatedDataSource;
	}

	function clearFilter(event: any) {
		const { columns: updatedColumns, dataSource: updatedDataSource } = clearFilterHelper(
			event,
			columns,
			dataSource,
			fullDataSource
		);
		columns = updatedColumns;
		dataSource = updatedDataSource;
	}

	// Page Navigation Helper Methods
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
			<div class="flex justify-end border p-1">
				{#if enableSearch}
					<div>
						<Search size="sm" on:input={handleSearch}></Search>
					</div>
				{/if}
			</div>
			<table class={`h-${gridHeight} block overflow-y-auto`}>
				<thead class="sticky top-0 bg-white">
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

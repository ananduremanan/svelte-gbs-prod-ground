<script lang="ts">
	import {
		AngleLeftOutline,
		AngleRightOutline,
		FilterOutline,
		SearchOutline
	} from 'flowbite-svelte-icons';
	import FilterPopUp from './FilterPopUp.svelte';
	import {
		handleApplyFilterHelper,
		clearFilterHelper,
		exportToExcelHelper,
		exportToPDFHelper
	} from './GridHelperFunctions';
	import { Search } from 'flowbite-svelte';

	interface PageSettingsProps {
		pageNumber: number;
	}

	// Props To Grid Component
	export let dataSource: any[];
	export let columns: any[];
	export let pageSettings: PageSettingsProps;
	export let enableSearch = false;
	export let lazy: boolean = false;
	export let enableExcelExport: boolean = false;
	export let excelName: string = 'data';
	export let enablePdfExport: boolean = false;
	export let pdfName: string = 'data';

	let currentPage = 0;
	let pageStart = 0;
	let pageEnd = 10;
	let fullDataSource = [...dataSource];
	let searchParam: string | number;

	// Total Number Of Pages
	const totalPages = Math.ceil(dataSource.length / pageSettings.pageNumber);

	// Added an additional column to show filter menu popup for each Column
	columns = columns.map((column) => ({ ...column, showFilterPopup: false, isFilterActive: false }));

	// Function to reset datasource when search cleared
	function resetSearch(event: any) {
		if (event.target.value === '') {
			dataSource = fullDataSource;
			goToPage(0);
		}
	}

	// Function For Seraching the Grid
	function handleSearch(searchParam: any) {
		if (!lazy) {
			dataSource = fullDataSource.filter((item: any) => {
				for (const key in item) {
					if (item[key].toString().toLowerCase().includes(searchParam.toLowerCase())) {
						return true;
					}
				}
				return false;
			});
			console.log(dataSource);

			goToPage(0);
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
		goToPage(0);
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
			<!-- Data Table -->
			<table>
				<thead>
					<!-- Grid Header Options -->
					<tr>
						<th class="border p-1" colspan={columns.length}>
							{#if enableSearch || enableExcelExport || enablePdfExport}
								<div class="flex justify-end gap-2">
									{#if enableExcelExport}
										<button
											on:click={() => exportToExcelHelper(dataSource, columns, excelName)}
											class="p-1 bg-blue-500 rounded-lg text-xs text-white">Export as Excel</button
										>
									{/if}
									{#if enablePdfExport}
										<button
											on:click={() => exportToPDFHelper(dataSource, columns, pdfName)}
											class="p-1 bg-blue-500 rounded-lg text-xs text-white">Export as PDF</button
										>
									{/if}
									{#if enableSearch}
										<div class="flex gap-1">
											<Search
												size="sm"
												bind:value={searchParam}
												on:input={resetSearch}
												class="outline-none p-2 text-sm"
											></Search>
											<button
												class="bg-blue-500 rounded-lg text-white w-10 flex items-center justify-center"
												on:click={() => {
													handleSearch(searchParam);
												}}><SearchOutline /></button
											>
										</div>
									{/if}
								</div>
							{/if}
						</th>
					</tr>
					<tr>
						{#each columns as columnHeader}
							<th class="border p-2">
								<div class="flex items-center gap-2 text-sm">
									{#if columnHeader.headerText}
										{columnHeader.headerText}
									{:else}
										{columnHeader.field}
									{/if}
									<!-- Filter Logic -->
									{#if columnHeader.filter && !columnHeader.template}
										<button
											on:click={() =>
												(columnHeader.showFilterPopup = !columnHeader.showFilterPopup)}
											><FilterOutline
												size="sm"
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
									<td class={`border p-2 text-sm ${column.template ? '' : ''}`}>
										{#if column.template}
											<div class="flex justify-center items-center h-full">
												<svelte:component this={column.template} {rowData} />
											</div>
										{:else}
											{rowData[column.field]}
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
						<!-- Pagination Logic -->
						<tr>
							<td colspan={columns.length} class="border">
								<div class="flex p-2 justify-between">
									<div class="flex gap-4">
										<button on:click={prevPage}
											><AngleLeftOutline
												class={`${currentPage === 0 ? 'text-gray-200' : ''}`}
											/></button
										>
										<div class="flex flex-row gap-3 items-center">
											{#if pageStart > 0}
												<button
													class="p-1 w-5 h-5 flex items-center justify-center rounded-full"
													on:click={() => {
														pageStart -= 10;
														pageEnd -= 10;
														currentPage = pageStart;
													}}>...</button
												>
											{/if}
											{#each Array(Math.min(10, Math.ceil(dataSource.length / pageSettings.pageNumber) - pageStart)) as _, i}
												<button
													on:click={() => goToPage(i)}
													class={`${pageStart + i === currentPage ? 'font-bold text-white p-1 w-6 h-6 bg-blue-500 flex items-center justify-center rounded-full' : ''}`}
													>{pageStart + i + 1}</button
												>
											{/each}
											{#if pageEnd < Math.ceil(dataSource.length / pageSettings.pageNumber)}
												<button
													class="p-1 w-5 h-5 flex items-center justify-center rounded-full"
													on:click={() => {
														pageStart += 10;
														pageEnd += 10;
														currentPage = pageStart;
													}}>...</button
												>
											{/if}
										</div>
										<button on:click={nextPage}
											><AngleRightOutline
												class={`${currentPage === totalPages - 1 ? 'text-gray-200' : ''}`}
											/></button
										>
									</div>

									<!-- Shows Total Pages and Items In Grid -->
									<div class="flex text-sm">
										{currentPage + 1} of {totalPages} pages ({dataSource.length} items)
									</div>
								</div>
							</td>
						</tr>
					{:else}
						<!-- Shows if Datasource array is empty -->
						<tr>
							<td colspan={columns.length} class="border p-2 text-center">No Data Found</td>
						</tr>
					{/if}
				</tbody>
			</table>
		{/if}
	{/if}
</div>

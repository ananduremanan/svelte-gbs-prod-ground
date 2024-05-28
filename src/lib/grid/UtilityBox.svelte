<div class="px-1 py-3">
	<div class={twMerge('flex justify-end gap-2', gridHeaderClass)}>
		{#if enableExcelExport}
			<button
				on:click={() => exportToExcelHelper(workingDataSource, columns, excelName)}
				class={gridButtonClass}>Export as Excel</button
			>
		{/if}
		{#if enablePdfExport}
			<button
				on:click={() => exportToPDFHelper(workingDataSource, columns, pdfName, pdfOptions)}
				class={gridButtonClass}>Export as PDF</button
			>
		{/if}
		{#if enableSearch}
			<div class="flex gap-1">
				<input
					type="search"
					bind:value={searchParam}
					on:input={resetSearch}
					class="outline-none p-2 text-sm font-normal bg-gray-50 rounded-lg"
					placeholder="Search"
				/>
				<button
					class={twMerge(
						'bg-white border rounded-lg text-black w-10 flex items-center justify-center',
						gridGlobalSearchButtonClass
					)}
					on:click={() => {
						handleSearch(searchParam);
					}}><SearchOutline /></button
				>
			</div>
		{/if}
	</div>
</div>

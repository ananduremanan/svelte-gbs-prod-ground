let activeFilterArray: Object[] = [];

export function handleApplyFilterHelper(
	event: any,
	columns: any[],
	dataSource: any[],
	fullDataSource: any[]
) {
	let filterValue = event.detail.filterValue.toLowerCase();
	let filterCondition = event.detail.selected;
	let filterColumn = event.detail.columnHeader;

	activeFilterArray.push({
		filterValue: filterValue,
		filterCondition: filterCondition,
		filterColumn: filterColumn
	});

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

	return { columns, dataSource };
}

// Function For Clearing the Filter
export function clearFilterHelper(
	event: any,
	columns: any[],
	dataSource: any[],
	fullDataSource: any[]
) {
	let filterColumn = event.detail.columnHeader;

	activeFilterArray = activeFilterArray.filter(
		(filter: any) => filter.filterColumn !== filterColumn
	);

	// Reset the isFilterActive and showFilterPopup flags for the cleared filter
	columns = columns.map((column: any) => {
		if (column.field === filterColumn) {
			return { ...column, isFilterActive: false, showFilterPopup: false };
		}
		return column;
	});

	// Reapply all active filters
	dataSource = fullDataSource;
	activeFilterArray.forEach((filter: any) => {
		dataSource = dataSource.filter((item: any) => {
			let columnValue = item[filter.filterColumn].toString().toLowerCase();
			switch (filter.filterCondition) {
				case 'contains':
					return columnValue.includes(filter.filterValue);
				case 'equals':
					return columnValue === filter.filterValue;
				default:
					return true;
			}
		});
	});

	return { columns, dataSource };
}

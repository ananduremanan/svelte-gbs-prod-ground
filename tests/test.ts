import { expect, test } from '@playwright/test';

test('Grid component renders with initial data', async ({ page }) => {
	await page.goto('/');

	// Ensure that the table headers are rendered
	const tableHeaders = await page.$$eval('th', (ths) => ths.map((th) => th.innerText.trim()));
	expect(tableHeaders).toEqual([
		'OrderID',
		'CustomerID',
		'EmployeeID',
		'Freight',
		'ShipCountry',
		'ShipAddress',
		'ShipPostalCode',
		'Grid Action'
	]); // Adjust these values according to actual column headers before running test

	// Ensure that initial rows are rendered
	const initialRows = await page.$$eval('tbody tr', (trs) => trs.length);
	expect(initialRows).toBeGreaterThan(0);

	// Ensure pagination elements are rendered
	const paginationButtons = await page.$$eval(
		'.flex.border.p-2.justify-between button',
		(buttons) => buttons.map((button: any) => button.innerText.trim())
	);
	expect(paginationButtons).toContain('‹'); // Previous button
	expect(paginationButtons).toContain('1'); // First page button
	expect(paginationButtons).toContain('...'); // Ellipsis for more pages
	expect(paginationButtons).toContain('›'); // Next button

	// Ensure total pages and items are displayed
	const pageInfoText = await page.$eval('.flex:not(.border)', (div: any) => div.innerText.trim());
	expect(pageInfoText).toMatch(/1 of \d+ pages \(\d+ items\)/); // Matches "1 of x pages (y items)"

	// Add more assertions here
});

test('Pagination buttons work correctly', async ({ page }) => {
	// Navigate to the page with the grid component

	// Click on the next page button
	await page.click('.flex.border.p-2.justify-between button:text("›")');

	// Verify that the page has changed
	const currentPageNumber = await page.$eval('.flex:not(.border)', (div: any) => {
		const match = div.innerText.trim().match(/(\d+) of (\d+) pages/);
		return match ? parseInt(match[1]) : -1;
	});
	expect(currentPageNumber).toBe(2);
});

import Serial from '$lib/template/Serial.svelte';

export const columns = [
	{ field: 'Sl No.', isPrimary: true, template: Serial },
	{ field: 'blockType', filter: true },
	{ field: 'label', filter: true },
	{ field: 'dependentBlock', filter: true },
	{ field: 'orderNumber', filter: true },
	{ field: 'Action' }
];

export const items = [
	{ value: 'cb', label: 'CheckBox' },
	{ value: 'dp', label: 'DatePicker' },
	{ value: 'sl', label: 'Select' },
	{ value: 'ml', label: 'MultiSelect' },
	{ value: 'ti', label: 'TextInput' }
];

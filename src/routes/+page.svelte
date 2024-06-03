<script lang="ts">
	import Grid from '$lib/grid/Grid2.0.svelte';
	import TextInput from '$lib/textinput/TextInput.svelte';
	import Button from '$lib/button/Button.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import Select from '$lib/dropdown/SelectRestructured.svelte';
	import { columns, items } from '../utils/componentData';
	import { addToast } from '$lib/toast/store';
	import Action from '$lib/template/Action.svelte';
	import Loading from '$lib/loading/Loading.svelte';

	let dataSource: any[] = [];
	let showPopup = false;
	let blockData = {
		blockType: '',
		label: '',
		dependentBlock: '',
		orderNumber: ''
	};

	function addToList() {
		dataSource = [...dataSource, { ...blockData }];
		blockData = {
			blockType: '',
			label: '',
			dependentBlock: '',
			orderNumber: ''
		};
		showPopup = false;
	}

	function cancelAdd() {
		blockData = {
			blockType: '',
			label: '',
			dependentBlock: '',
			orderNumber: ''
		};
		showPopup = false;
	}

	let toastSettings = {
		type: 'custom',
		dismissible: false,
		timeout: 3000,
		component: Action
	};
</script>

<div class="p-20">
	<div class="text-lg">Create Request Block</div>
	<div class="flex justify-between mt-8">
		<div>
			<TextInput placeholder="Enter Form Name" id="form_name" />
		</div>
		<div>
			<Button class="bg-blue-900 rounded-none" on:click={() => addToast(toastSettings)}
				>Show Preview</Button
			>
			<Button
				class="bg-green-600 rounded-none"
				on:click={() => {
					showPopup = !showPopup;
				}}>Add New Block</Button
			>
			<Button class="bg-blue-900 rounded-none">Save</Button>
		</div>
	</div>
	<div class="mt-8">
		<Grid {dataSource} {columns} pageSettings={{ pageNumber: 10 }} enableSearch />
	</div>
	<Loading type="stroke" />
</div>

<Modal bind:showModal={showPopup} modalTitle="Add New Block" autoclose>
	<div class="grid grid-cols-2 gap-2">
		<div>Select Your Block:</div>
		<div>
			<Select {items} bind:selected={blockData.blockType} id="blocks" />
		</div>
		<div>Enter Label:</div>
		<div>
			<TextInput id="label" placeholder="Eg: Enter Your Name Here" bind:value={blockData.label} />
		</div>
		<div>Select Dependent Block:</div>
		<div>
			<TextInput
				id="dependentblock"
				placeholder="Eg: Enter Your Name Here"
				bind:value={blockData.dependentBlock}
			/>
		</div>
		<div>Order Number:</div>
		<div>
			<TextInput
				id="order_number"
				placeholder="Eg: Enter Your Order Number Here"
				bind:value={blockData.orderNumber}
			/>
		</div>
		<div></div>
		<div>
			<Button on:click={addToList}>Add</Button>
			<Button on:click={cancelAdd}>Cancel</Button>
		</div>
	</div>
</Modal>

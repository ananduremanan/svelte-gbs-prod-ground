<script lang="ts">
	import { countries } from '$lib';
	import Button from '$lib/button/Button.svelte';
	import SelectRestructured from '$lib/dropdown/SelectRestructured.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import TextInput from '$lib/textinput/TextInput.svelte';

	let showModal: boolean = false;
	let formData = {
		name: undefined,
		country: undefined
	};

	function handleSubmit() {
		console.log('formData', formData);
	}
</script>

<Modal {showModal}>
	<form action="" on:submit|preventDefault={handleSubmit}>
		<TextInput type="text" placeholder="Enter Name" bind:value={formData.name} />
		<SelectRestructured items={countries} bind:selected={formData.country} />
		<Button type="submit">Submit</Button>
	</form>
</Modal>

<section class="min-h-screen flex items-center justify-center">
	<Button
		on:click={() => {
			showModal = !showModal;
		}}>Show Modal</Button
	>
</section>

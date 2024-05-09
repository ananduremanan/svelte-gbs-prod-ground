<script lang="ts">
	import Button from "$lib/button/Button.svelte";
	import Modal from "$lib/modal/Modal.svelte";

	let showModal = false;
</script>

<div>
	<Button
		on:click={() => {
			showModal = !showModal;
		}}>Submit</Button
	>

	<Modal bind:showModal autoclose modalTitle="Disclaimer" classModalContent="">
		<p class="text-xs">
			The information provided on this website is for general informational purposes only. It is not
			intended to be a substitute for professional advice, diagnosis, or treatment. Always seek the
			advice of your physician or other qualified health provider with any questions you may have
			regarding a medical condition. Never disregard professional medical advice or delay in seeking
			it because of something you have read on this website.
		</p>
		<div>
			<Button class="mt-2">Accept</Button>
		</div>
	</Modal>
</div>

<script lang="ts">
	import Uploader from '$lib/uploader/Uploader.svelte';
	import Button from '$lib/button/Button.svelte';

	let selectedFiles: any = null;
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
	<Uploader multiple showPreview bind:selectedFiles />
	{#if selectedFiles && Object.keys(selectedFiles).length > 0}
		<Button class="mt-4">Upload Files</Button>
	{/if}
</div>

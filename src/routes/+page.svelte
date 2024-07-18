<script lang="ts">
	import Uploader from '$lib/uploader/Uploader.svelte';
	import Button from '$lib/button/Button.svelte';
	import { uploadFileInChunks } from '$lib';
	import Spinner from '$lib/loading/Spinner.svelte';

	let selectedFiles: any;
	let uploadProgress: boolean = false;

	async function uploadHandler() {
		for (let file of selectedFiles) {
			try {
				uploadProgress = true;
				await uploadFileInChunks(file, 'http://127.0.0.1:3000/upload');
			} catch (error) {
				console.error(error);
			} finally {
				uploadProgress = false;
			}
		}
	}
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
	<Uploader multiple showPreview bind:selectedFiles />
	{#if selectedFiles && selectedFiles.length > 0}
		<Button
			class={`mt-4 ${uploadProgress ? 'bg-gray-100' : 'bg-blue-400'}`}
			on:click={uploadHandler}
			disabled={uploadProgress}
			>{#if uploadProgress}
				<span class="text-black flex gap-2 justify-center items-center"
					><Spinner size="h-6 w-6" type="stroke" />Uploading Please Wait...</span
				>
			{:else}
				<span>Upload Files</span>
			{/if}</Button
		>
	{/if}
</div>

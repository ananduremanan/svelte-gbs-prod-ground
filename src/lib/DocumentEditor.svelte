<script lang="ts">
	import { convertToHtml } from './DocumentEditorHelper';
	import { onMount } from 'svelte';

	let editor: any;
	let quill: any;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	let selectedFile = null;
	let html: any = null;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
	});

	async function handleFileChange(event: any) {
		const file = event.target.files[0];
		selectedFile = file;
		try {
			html = await convertToHtml(file);
			quill.clipboard.dangerouslyPasteHTML(html);
			console.log(html);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="border-2 w-[200px] flex justify-center rounded-lg p-2 cursor-pointer">
	<label for="fileInput" class="cursor-pointer">Upload File</label>
	<input
		id="fileInput"
		type="file"
		accept=".doc,.docx"
		on:change={handleFileChange}
		style="display: none;"
	/>
</div>

<div class="editor-wrapper">
	<div bind:this={editor} />
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>

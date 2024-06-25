<script lang="ts">
	import { UploadOutline } from 'flowbite-svelte-icons';

	export let placeHolder = 'Select Files to Upload';
	export let uploaderClass =
		'flex items-center border border-dashed border-gray-300 hover:border-gray-400 cursor-pointer rounded-lg';
	export let placeholderClass = 'text-sm tracking-wider text-gray-400 group-hover:text-gray-600';
	export let placeHolderContainerClass = 'flex items-center justify-center px-4 py-2 gap-2';
	export let iconColor = 'gray';
	export let showPreview: boolean = false;
	export let selectedFiles: FileList | null = null;

	let filePreviews: any[] = [];

	function updateLabel(event: any) {
		const input = event.target;
		const label = input.previousElementSibling.querySelector('p');

		if (input.files && input.files.length > 0) {
			selectedFiles = input.files;
			const fileNames = Array.from(input.files)
				.map((file: any) => file.name)
				.join(', ');
			label.textContent = fileNames;

			filePreviews = [];
			Array.from(input.files).forEach((file: any) => {
				if (file.type.startsWith('image/')) {
					const reader = new FileReader();
					reader.onload = (e: any) => {
						filePreviews = [...filePreviews, { name: file.name, url: e.target.result }];
					};
					reader.readAsDataURL(file);
				} else {
					filePreviews = [...filePreviews, { name: file.name, url: null }];
				}
			});
		} else {
			label.textContent = placeHolder;
			filePreviews = [];
		}
	}
</script>

<div class="flex flex-col items-center justify-center w-80 space-y-4">
	<label class={uploaderClass}>
		<div class={placeHolderContainerClass}>
			<UploadOutline color={iconColor} />
			<p class={placeholderClass}>{placeHolder}</p>
		</div>
		<input type="file" class="hidden" multiple on:change={updateLabel} {...$$restProps} />
	</label>

	{#if showPreview && filePreviews.length > 0}
		<div class="flex gap-2 max-h-20 border border-dotted p-2 rounded-lg">
			{#each filePreviews as { name, url }}
				<div class="flex items-center justify-center">
					{#if url}
						<img src={url} alt={name} class="max-w-full max-h-full rounded-lg shadow-md" />
					{:else}
						<p class="text-sm text-gray-500">{name} (Preview not available)</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

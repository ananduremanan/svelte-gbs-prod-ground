<script lang="ts">
	import {
		UploadOutline,
		FileOutline,
		FilePdfOutline,
		FileChartBarOutline,
		FileWordOutline,
		FileMusicOutline,
		FileVideoOutline,
		CloseCircleOutline
	} from 'flowbite-svelte-icons';

	export let placeHolder = 'Select Files to Upload';
	export let uploaderClass =
		'flex items-center border border-dashed border-gray-300 hover:border-gray-400 cursor-pointer rounded-lg';
	export let placeholderClass = 'text-sm tracking-wider text-gray-400 group-hover:text-gray-600';
	export let placeHolderContainerClass = 'flex items-center justify-center px-4 py-2 gap-2';
	export let iconColor = 'gray';
	export let showPreview: boolean = false;
	export let selectedFiles: FileList | null = null;

	let filePreviews: any[] = [];
	let fileInput: any;

	function getFileIcon(fileType: string) {
		if (fileType.startsWith('image/')) return null;
		if (fileType === 'application/pdf') return FilePdfOutline;
		if (
			fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
			fileType === 'application/vnd.ms-excel'
		)
			return FileChartBarOutline;
		if (
			fileType === 'application/msword' ||
			fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		)
			return FileWordOutline;
		if (fileType.startsWith('audio/')) return FileMusicOutline;
		if (fileType.startsWith('video/')) return FileVideoOutline;
		return FileOutline;
	}

	function updateLabel() {
		if (fileInput.files && fileInput.files.length > 0) {
			selectedFiles = fileInput.files;
			const fileNames = Array.from(fileInput.files)
				.map((file: any) => file.name)
				.join(', ');
			placeHolder = fileNames;

			filePreviews = Array.from(fileInput.files).map((file: any) => ({
				name: file.name,
				url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
				type: file.type
			}));
		} else {
			placeHolder = 'Select Files to Upload';
			filePreviews = [];
		}
	}

	function removeFile(index: number) {
		filePreviews = filePreviews.filter((_, i) => i !== index);

		const dt = new DataTransfer();
		Array.from(fileInput.files).forEach((file: any, i) => {
			if (i !== index) dt.items.add(file);
		});
		fileInput.files = dt.files;
		selectedFiles = fileInput.files;

		updateLabel();
	}
</script>

<div class="flex flex-col items-center justify-center w-80 space-y-4">
	<label class={uploaderClass}>
		<div class={placeHolderContainerClass}>
			<UploadOutline color={iconColor} />
			<p class={placeholderClass}>{placeHolder}</p>
		</div>
		<input
			bind:this={fileInput}
			type="file"
			class="hidden"
			multiple
			on:change={updateLabel}
			{...$$restProps}
		/>
	</label>

	{#if showPreview && filePreviews.length > 0}
		<div
			class="flex flex-wrap gap-2 max-h-40 overflow-y-auto border border-dotted p-2 rounded-lg px-4"
		>
			{#each filePreviews as { name, url, type }, index}
				<div
					class="relative w-16 h-16 flex flex-col items-center justify-center overflow-hidden group"
				>
					{#if url}
						<img src={url} alt={name} class="w-full h-full object-cover rounded-lg shadow-md" />
					{:else}
						<svelte:component this={getFileIcon(type)} size="32" color={iconColor} />
						<p class="text-xs text-gray-500 text-center mt-1 truncate w-full">{name}</p>
					{/if}
					<button
						class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
						on:click={() => removeFile(index)}
					>
						<CloseCircleOutline size="sm" />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

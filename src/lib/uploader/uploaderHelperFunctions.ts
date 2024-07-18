import {
	FileOutline,
	FilePdfOutline,
	FileChartBarOutline,
	FileWordOutline,
	FileMusicOutline,
	FileVideoOutline
} from 'flowbite-svelte-icons';

export function getFileIconHelper(fileType: string) {
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

export function updateLabelHelper(fileInput: HTMLInputElement) {
	let updatedPlaceHolder: string;
	let updatedSelectedFiles: FileList | null;
	let updatedFilePreviews: any[];

	if (fileInput.files && fileInput.files.length > 0) {
		updatedSelectedFiles = fileInput.files;
		const fileNames = Array.from(fileInput.files)
			.map((file: File) => file.name)
			.join(', ');
		updatedPlaceHolder = fileNames;

		updatedFilePreviews = Array.from(fileInput.files).map((file: File) => ({
			name: file.name,
			url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
			type: file.type
		}));
	} else {
		updatedPlaceHolder = 'Select Files to Upload';
		updatedSelectedFiles = null;
		updatedFilePreviews = [];
	}

	return { updatedPlaceHolder, updatedSelectedFiles, updatedFilePreviews };
}

export function removeFileHelper(index: number, filePreviews: any[], fileInput: HTMLInputElement) {
	const updatedFilePreviews = filePreviews.filter((_, i) => i !== index);

	const dt = new DataTransfer();
	Array.from(fileInput.files || []).forEach((file: File, i) => {
		if (i !== index) dt.items.add(file);
	});
	fileInput.files = dt.files;
	const updatedSelectedFiles = fileInput.files;

	return { updatedFilePreviews, updatedSelectedFiles };
}

export async function uploadFileInChunks(
	file: File,
	apiURL: string,
	chunkSize: number = 1024 * 1024
) {
	let uploadProgress: { [key: string]: number } = {};
	const totalChunks = Math.ceil(file.size / chunkSize);

	for (let i = 0; i < totalChunks; i++) {
		const start = i * chunkSize;
		const end = Math.min(file.size, start + chunkSize);
		const chunk = file.slice(start, end);

		const formData = new FormData();
		formData.append('file', chunk, file.name);
		formData.append('chunkIndex', i.toString());
		formData.append('totalChunks', totalChunks.toString());

		try {
			const response = await fetch(apiURL, {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			uploadProgress[file.name] = ((i + 1) / totalChunks) * 100;
		} catch (error) {
			console.error(`Error uploading chunk ${i + 1} of ${file.name}:`, error);
			throw new Error(`Upload failed at chunk ${i + 1}`);
		}
	}

	return uploadProgress;
}

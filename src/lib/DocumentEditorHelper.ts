import mammoth from 'mammoth';

export async function convertToHtml(file: any) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();

		reader.onload = function (event: any) {
			let arrayBuffer = event.target.result;
			mammoth
				.convertToHtml({ arrayBuffer: arrayBuffer })
				.then(function (result: any) {
					resolve(result.value);
				})
				.catch(reject);
		};

		reader.readAsArrayBuffer(file);
	});
}
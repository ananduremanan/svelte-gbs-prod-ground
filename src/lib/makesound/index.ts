// MakeSound.js
import { Howl } from 'howler';

export const MakeSound = (filePath: string) => {
	const sound = new Howl({
		src: [filePath]
	});

	return function playSound() {
		sound.play();
	};
};

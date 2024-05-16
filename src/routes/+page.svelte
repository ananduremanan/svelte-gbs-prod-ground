<script>
	import { MakeSound } from '$lib/makesound/index';

	const playClickSound = MakeSound('/click.mp3');
</script>

<button on:click={playClickSound}>Click</button>

<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let checked: boolean;
	export let toggleClass: string = 'w-11 h-6 bg-gray-200 peer-checked:bg-blue-400';
</script>

<label class="items-center cursor-pointer w-11">
	<input type="checkbox" bind:checked class="sr-only peer" />
	<div
		class={twMerge(
			toggleClass,
			`relative peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-700 after:bg-white peer-checked:after:border-white after:border-gray-300 dark:border-gray-600 `
		)}
	></div>
</label>

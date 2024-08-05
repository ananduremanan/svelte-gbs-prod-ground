<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let checked: boolean;
	export let checkboxClass = 'text-blue-400';
</script>

<input
	type="checkbox"
	{...$$restProps}
	bind:checked
	class={twMerge(checkboxClass, 'form-checkbox h-5 w-5 rounded border-gray-300 cursor-pointer')}
/>

<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let href: string = '';
	export let disabled: boolean = false;
	export let target: string = '';
	export let outline: boolean = false;

	let defaultStyle = `${!outline ? 'bg-blue-500 text-white hover:bg-blue-400' : 'border text-black hover:bg-blue-500 hover:text-white'}  p-2 rounded-lg text-sm`;
</script>

{#if href}
	<a {href} class={twMerge(defaultStyle, $$props.class)} {target}><slot /></a>
{:else}
	<button
		{...$$restProps}
		class={twMerge(defaultStyle, $$props.class)}
		{disabled}
		on:click
		on:change
		on:keydown
		on:keyup
		on:touchstart|passive
		on:touchend
		on:touchcancel
		on:mouseenter
		on:mouseleave><slot /></button
	>
{/if}

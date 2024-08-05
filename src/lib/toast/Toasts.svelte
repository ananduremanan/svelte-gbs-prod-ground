<script lang="ts">
	import Toast from './Toast.svelte';
	import { dismissToast, toasts } from './store';

	export let position: string = 'top-0 left-0';
	export let toastClass =
		'bg-white px-2 py-3 rounded-lg text-sm flex justify-between w-40 md:w-80 m-2 border shadow-lg';
</script>

{#if $toasts}
	<section class={`fixed flex mt-4 justify-end flex-col z-50 p-4 ${position}`}>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}
				toastClassInner={toastClass}
			>
				{#if toast.component}
					<svelte:component this={toast.component} />
				{:else}
					{toast.message}
				{/if}
			</Toast>
		{/each}
	</section>
{/if}

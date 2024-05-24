<script lang="ts">
	import Toast from './Toast.svelte';
	import { dismissToast, toasts } from './store';
</script>

{#if $toasts}
	<section class="fixed flex mt-4 justify-end flex-col z-50 p-4 top-0 right-0">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}
				>{toast.message}
			</Toast>
		{/each}
	</section>
{/if}

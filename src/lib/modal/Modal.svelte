<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let showModal: boolean = false;
	export let modalTitle: string = 'Modal Title';
	export let autoclose: boolean = false;
	export let modalClass: string = 'bg-gray-500';
	export let modalContentClass: string = 'bg-white m-10 md:w-[80vh] rounded-xl';
	export let classModalContent: string = '';
	export let modalTitleClass: string =
		'p-4 text-lg leading-6 font-medium text-gray-900 flex justify-between';
	export let classModalTitle: string = '';

	let classModal =
		'fixed z-10 overflow-y-auto inset-0 flex items-center justify-center bg-opacity-75 transition-opacity';

	function autoCloseHandler() {
		if (autoclose) {
			showModal = false;
		}
	}
</script>

{#if showModal}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class={twMerge(modalClass, classModal)}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		on:click={autoCloseHandler}
	>
		<div
			class={twMerge(modalContentClass, classModalContent)}
			on:click|stopPropagation
			role="dialog"
		>
			<div class={twMerge(modalTitleClass, classModalTitle)}>
				{modalTitle}
			</div>
			<hr />
			<div class="p-4"><slot /></div>
		</div>
	</div>
{/if}

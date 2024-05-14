<script lang="ts">
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { Calendar as CalenderIcon } from 'lucide-svelte';

	export let value: any;
	export let placeholder: string = 'Select Date';

	let showCalender: boolean = false;
</script>

<div class="flex flex-col justify-center items-center relative">
	<button
		class="border px-2 py-1 rounded-lg w-[16rem] justify-between flex text-gray-400"
		on:click={() => (showCalender = !showCalender)}
	>
		{#if value}
			{value}
		{:else}
			{placeholder}
		{/if}
		<CalenderIcon size="20" class="text-gray-300" /></button
	>
	{#if showCalender}
		<Calendar
			bind:value
			class="absolute top-6"
			initialFocus
			on:date_selected={() => {
				showCalender = !showCalender;
			}}
		/>
	{/if}
</div>

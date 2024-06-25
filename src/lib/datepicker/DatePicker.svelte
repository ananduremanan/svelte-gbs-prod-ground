<script lang="ts">
	import { onMount } from 'svelte';
	import Calendar from '../assets/icons/Calendar.svelte';

	let showDatepicker = false;
	export let selectedDate = new Date();
	export let minDate: Date | null = null;
	export let maxDate: Date | null = null;

	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();
	let days: any[] = [];

	const today = new Date();

	const toggleDatepicker = () => {
		showDatepicker = !showDatepicker;
	};

	const selectDate = (date: any) => {
		selectedDate = date;
		showDatepicker = false;
	};

	const getDaysInMonth = (year: any, month: any) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const generateCalendar = (year: any, month: any) => {
		const daysInMonth = getDaysInMonth(year, month);
		const firstDay = new Date(year, month, 1).getDay();
		const weeks = [];
		let day = 1;

		for (let i = 0; i < 6; i++) {
			const week = [];
			for (let j = 0; j < 7; j++) {
				if (i === 0 && j < firstDay) {
					week.push(null);
				} else if (day > daysInMonth) {
					week.push(null);
				} else {
					const date = new Date(year, month, day);
					week.push(date);
					day++;
				}
			}
			weeks.push(week);
		}
		return weeks;
	};

	const prevMonth = () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		days = generateCalendar(currentYear, currentMonth);
	};

	const nextMonth = () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		days = generateCalendar(currentYear, currentMonth);
	};

	const goToToday = () => {
		currentMonth = today.getMonth();
		currentYear = today.getFullYear();
		days = generateCalendar(currentYear, currentMonth);
		selectedDate = new Date();
	};

	onMount(() => {
		days = generateCalendar(currentYear, currentMonth);
	});
</script>

<div class="relative inline-block w-72">
	<button
		on:click={toggleDatepicker}
		class="border p-2 rounded w-full flex gap-2 items-center dark:text-white"
	>
		<Calendar size={20} />{selectedDate.toLocaleDateString()}
	</button>

	{#if showDatepicker}
		<div
			class="absolute z-10 bg-white border border-gray-300 shadow-lg mt-1 w-full rounded dark:bg-black dark:text-white pb-8"
		>
			<div class="flex justify-between items-center p-2">
				<button
					on:click={prevMonth}
					class="text-gray-500 hover:text-gray-700 border w-6 h-6 rounded-md flex items-center justify-center"
					>&laquo;</button
				>
				<span>
					{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
					{currentYear}
				</span>
				<button
					on:click={nextMonth}
					class="text-gray-500 hover:text-gray-700 border w-6 h-6 rounded-md flex items-center justify-center"
					>&raquo;</button
				>
			</div>
			<div class="grid grid-cols-7 p-2 gap-1">
				{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
					<div class="text-center font-bold text-sm">{day}</div>
				{/each}
				{#each days as week}
					{#each week as day}
						{#if day}
							{#if (!minDate || day >= minDate) && (!maxDate || day <= maxDate)}
								<button
									on:click={() => selectDate(day)}
									class="text-center p-1 cursor-pointer rounded-full hover:bg-gray-200 {day.getDate() ===
										selectedDate.getDate() &&
									day.getMonth() === selectedDate.getMonth() &&
									day.getFullYear() === selectedDate.getFullYear()
										? 'bg-blue-400 rounded-full text-white'
										: ''}"
								>
									{day.getDate()}
								</button>
							{:else}
								<button disabled class="text-center p-1 rounded-full bg-gray-100 text-gray-400">
									{day.getDate()}
								</button>
							{/if}
						{:else}
							<div class="text-center p-1"></div>
						{/if}
					{/each}
				{/each}
			</div>
			<button on:click={goToToday} class="px-4 mt-4 text-blue-500">Today</button>
		</div>
	{/if}
</div>

<script lang="ts">
	import { CaretDownSolid, CloseOutline } from 'flowbite-svelte-icons';
	import { twMerge } from 'tailwind-merge';

	export let items: any[] = [];
	export let value: any = undefined;
	export let lazy: boolean = false;
	export let dropStyle: string = '';
	export let disabled: boolean = false;

	let fullDataSource = [...items];
	let displayValue: any = undefined;
	let showOptions = false;

	function inputFocusHandler() {
		showOptions = true;
	}

	function inputSearchHandler(event: any) {
		if (!lazy) {
			items = fullDataSource.filter((item: any) => {
				for (const key in item) {
					if (item[key].toString().toLowerCase().includes(event.target.value.toLowerCase())) {
						return true;
					}
				}
				return false;
			});
		}
	}
</script>

<div class="relative">
	<input
		type="text"
		class={twMerge(`${disabled ? 'bg-gray-300' : 'px-3 py-2 border rounded'}`, $$props.class)}
		on:focus={inputFocusHandler}
		bind:value={displayValue}
		on:input={inputSearchHandler}
		{disabled}
	/>
	{#if displayValue}
		<button
			class="absolute top-0 right-4 h-full px-3 flex items-center mr-2"
			on:click={() => {
				displayValue = undefined;
				value = undefined;
			}}
		>
			<CloseOutline color="gray" />
		</button>
	{/if}
	<button
		class="absolute top-0 right-0 h-full px-3 flex items-center"
		on:click={() => {
			if (!disabled) {
				showOptions = !showOptions;
			}
		}}
	>
		<CaretDownSolid color="gray" />
	</button>
	<!-- options dropdown list -->
	{#if showOptions}
		<div
			class={twMerge(
				'absolute left-0 right-0 mt-1 flex flex-col items-start bg-gray-200 border rounded h-40 overflow-y-auto',
				dropStyle
			)}
		>
			{#if items.length > 0}
				{#each items as { value: itemValue, name, imgSrc }}
					<button
						class="px-4 py-2 w-full text-left hover:bg-orange-400 flex gap-2"
						on:click={() => {
							displayValue = name;
							value = itemValue;
							showOptions = false;
						}}
					>
						{#if imgSrc}
							<img src={imgSrc} alt={`imgSrc`} class="w-5 h-5 rounded-full object-cover" />
						{/if}
						{name}</button
					>
				{/each}
			{:else}
				<div class="text-sm text-center">No DataSource Found</div>
			{/if}
		</div>
	{/if}
</div>

<script lang="ts">
	export let value: any = '';
	export let OTPFeild: boolean = false;
	export let OTPValue: string = '';
	export let OTPLength: number = 4;
	export let OTPClass: string = 'w-8 h-10 m-1 border border-gray-600 rounded-lg text-center';

	let defaultClass = 'bg-gray-100 p-2 rounded-lg';

	let otpValues: string[] = new Array(OTPLength).fill('');
	let inputRefs: HTMLInputElement[] = [];

	// Function to update the OTP values and focus the next field
	function updateOtpValue(index: number, e: Event) {
		const input = e.target as HTMLInputElement;
		if (input) {
			otpValues[index] = input.value;
			if (index < OTPLength - 1 && input.value) {
				inputRefs[index + 1].focus();
			}
			OTPValue = otpValues.join('');
		}
	}

	// Function to handle backspace/delete on empty fields
	function handleBackspace(index: number, e: KeyboardEvent) {
		if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
			inputRefs[index - 1].focus();
		}
	}
</script>

{#if !OTPFeild}
	<div class="text-input-container">
		<input
			class={defaultClass}
			{...$$restProps}
			bind:value
			on:blur
			on:change
			on:click
			on:contextmenu
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input
		/>
	</div>
{:else}
	<div class="otp-container">
		{#each Array(OTPLength) as _, index (index)}
			<input
				type="text"
				maxlength="1"
				pattern="[0-9]*"
				bind:value={otpValues[index]}
				on:input={(e) => updateOtpValue(index, e)}
				on:keydown={(e) => handleBackspace(index, e)}
				bind:this={inputRefs[index]}
				class={OTPClass}
			/>
		{/each}
	</div>
{/if}

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/BreadCrumb) for more information.
## Props
```javascript
let value: any = '';
let OTPFeild: boolean = false;
let OTPValue: string = '';
let OTPLength: number = 4;
let OTPClass: string = 'w-8 h-10 m-1 border border-gray-600 rounded-lg text-center';
```

## Usage
```svelte
<script>
	import { Input } from "@grampro/svelte-block";
	export let rowIndex;
	export let rowData;
</script>

<Input placeholder="Enter Remarks" id={`gbs-${rowIndex}`} bind:value={rowData.remarks} />
```
-->

<script lang="ts">
	import DatePicker from '$lib/datepicker/DatePicker.svelte';
	let value: any;
</script>

<div class="flex justify-center items-center min-h-screen">
	<DatePicker bind:value />
</div>

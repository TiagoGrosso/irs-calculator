<script lang="ts">
	import { ButtonGroup, Input, InputAddon, Label, NumberInput } from 'flowbite-svelte';

	import { calcInput } from '$lib/stores/calc-input-store';
</script>

<div>
	<div class="mb-6">
		<Label for="website-admin" class="mb-2 block">Salário Bruto Anual</Label>
		<ButtonGroup class="w-full">
			<InputAddon>€</InputAddon>
			<NumberInput id="income" placeholder="15000" bind:value={$calcInput.annualIncome} />
		</ButtonGroup>
	</div>
</div>

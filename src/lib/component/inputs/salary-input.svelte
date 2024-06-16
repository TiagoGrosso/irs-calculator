<script lang="ts">
	import { AccordionItem, ButtonGroup, Input, InputAddon, Label } from 'flowbite-svelte';

	import { calcInput } from '$lib/stores/calc-input-store';
	import { UserCircleSolid } from 'flowbite-svelte-icons';
</script>

<div>
	<div class="mb-6">
		<Label for="website-admin" class="mb-2 block">Salário Bruto Anual</Label>
		<ButtonGroup class="w-full">
			<InputAddon>€</InputAddon>
			<Input id="income" placeholder="15000" bind:value={$calcInput.annualIncome} />
		</ButtonGroup>
	</div>
</div>

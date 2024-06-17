<script lang="ts">
	import { calcInput } from '$lib/stores/calc-input-store';
	import { ButtonGroup, InputAddon, NumberInput, Tooltip } from 'flowbite-svelte';
	import { QuestionCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		{#each $calcInput.expenses as expense, i}
			<span class="inline-flex w-fit items-center gap-1 align-middle">
				<span class="text-bo text-lg">{expense.type.name}</span>
				<QuestionCircleSolid />
			</span>
			<Tooltip>{expense.type.tooltip}</Tooltip>
			<div class="grid grid-cols-2 gap-6">
				<ButtonGroup>
					<InputAddon>€</InputAddon>
					<NumberInput id="expenses-{i}" placeholder="Total despesas" bind:value={expense.amount} />
				</ButtonGroup>
				<ButtonGroup>
					<InputAddon>€</InputAddon>
					<NumberInput
						id="calculated-deductions-{i}"
						placeholder="Dedução à coleta"
						value={expense.type.calcDeductions(expense.amount)}
						disabled
					/>
				</ButtonGroup>
			</div>
		{/each}
		<span class="text-bo text-lg">Outras deduções não contempladas neste simulador:</span>
		<div class="grid grid-cols-2 gap-6">
			<ButtonGroup>
				<InputAddon>€</InputAddon>
				<NumberInput
					id="otherDeductions"
					placeholder="Deduções"
					bind:value={$calcInput.otherDeductions}
				/>
			</ButtonGroup>
		</div>
	</div>
</div>

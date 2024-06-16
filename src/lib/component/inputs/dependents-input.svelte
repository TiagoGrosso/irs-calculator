<script lang="ts">
	import { addDependent, calcInput, deleteDependent } from '$lib/stores/calc-input-store';
	import { dependentDeductions } from '$lib/stores/derived-values-store';
	import { Badge, Button, Input, Tooltip } from 'flowbite-svelte';
	import { PlusOutline, QuestionCircleSolid, TrashBinOutline } from 'flowbite-svelte-icons';
</script>

<div>
	<h2 class="mb-3">Adiciona os teus dependentes e introduz a idade de cada um:</h2>
	<div class="grid grid-cols-3 gap-3">
		{#each $calcInput.dependents as dependent, i}
			<span class="flex gap-1">
				<Input type="number" id={`dependent-${i}`} placeholder="0" bind:value={dependent} />
				<Button
					class="!p-2"
					on:click={() => {
						deleteDependent(i);
					}}><TrashBinOutline class="h-6 w-6" /></Button
				>
			</span>
		{/each}
		<Button class="!p-2" on:click={() => addDependent(0)}><PlusOutline class="h-6 w-6" /></Button>
	</div>

	<div class="mt-3">
		<span class="inline-flex align-middle items-center">
			<Badge large color="green">Deduções por dependentes: {$dependentDeductions}€</Badge>
			<a href="https://www.santander.pt/salto/despesas-dedutiveis-irs" target="_blank"><QuestionCircleSolid /></a>
		</span>
		<Tooltip>Clica no '?' para mais informação sobre este cálculo</Tooltip>
	</div>
</div>

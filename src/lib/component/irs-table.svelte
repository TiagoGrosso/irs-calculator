<script lang="ts">
	import { calcInput } from '$lib/stores/calc-input-store';
	import { collectibleIncome } from '$lib/stores/derived-values-store';
	import {
		canDeleteRate,
		deleteRate,
		getAvailableRates,
		typeToRates
	} from '$lib/stores/rates-store';
	import { Rate, sumTax } from '$lib/types/Rate';
	import {
		Button,
		Select,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';

	export let index: number;

	$: selectedValue = $calcInput.selected[index];

	$: rates = $typeToRates.get(selectedValue)!;
	$: totalTax = sumTax($collectibleIncome, rates);

	function deleteSelectedRate() {
		const availableRates = getAvailableRates($typeToRates);
		const nextSelected =
			availableRates[availableRates.map((r) => r.name).indexOf(selectedValue) - 1];
		deleteRate(selectedValue);
		$calcInput.selected[index] = nextSelected.name as string;
	}
</script>

<div class="bg mb-16 flex w-full flex-col gap-1 md:mb-6">
	<div class="inline-flex">
		<Select items={getAvailableRates($typeToRates)} bind:value={$calcInput.selected[index]}
		></Select>
		{#if canDeleteRate(selectedValue)}
			<Button on:click={() => deleteSelectedRate()}><TrashBinOutline class="h-6 w-6" /></Button>
		{/if}
	</div>
	{#if selectedValue}
		<Table shadow>
			<TableHead>
				<TableHeadCell>Escalão</TableHeadCell>
				<TableHeadCell>Taxa Marginal</TableHeadCell>
				<TableHeadCell>Parcela a abater</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each rates as rate}
					<TableBodyRow>
						<TableBodyCell>{rate.getIntervalString()}</TableBodyCell>
						<TableBodyCell>{rate.getTaxString()}</TableBodyCell>
						<TableBodyCell>{`${rate.getTaxAmount($collectibleIncome).toFixed(2)}€`}</TableBodyCell>
					</TableBodyRow>
				{/each}
				<TableBodyRow>
					<TableBodyCell>Total</TableBodyCell>
					<TableBodyCell>N/A</TableBodyCell>
					<TableBodyCell>{`${totalTax.toFixed(2)}€`}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	{/if}
</div>

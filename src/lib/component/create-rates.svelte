<script lang="ts">
	import { addRate, getAvailableRates, typeToRates, userRates } from '$lib/stores/rates-store';
	import type { RateData } from '$lib/types/Rate';
	import {
		Alert,
		Button,
		Input,
		Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { InfoCircleSolid, PlusOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	let createModalOpen = false;
	let tableName: string | undefined;
	let validationResult: string | undefined;

	$: {
		if (!tableName || tableName.length === 0) {
			validationResult = 'Nome da tabela não pode estar vazio';
		} else if ($userRates.map((r) => r.name).includes(tableName)) {
			validationResult = `Tabela com o nome '${tableName}' já existe`;
		} else {
			validationResult = undefined;
		}
	}

	type Rate = {
		to: number;
		rate: number;
	};

	let newRates: Rate[] = [
		{
			to: 5000.65,
			rate: 10.35
		}
	];

	function bindRates(rates: Rate[]) {
		for (let i = 0; i < newRates.length; ++i) {
			const rate = newRates[i];
			const boundRate = {
				to: Math.max(getFrom(newRates, i), rate.to),
				rate: Math.max(0, Math.min(100, rate.rate))
			};
			newRates[i] = boundRate;
		}
	}

	function getFrom(rates: Rate[], i: number) {
		if (i === 0) {
			return 0;
		}
		return rates[i - 1].to;
	}

	function removeRate(index: number) {
		newRates = newRates.filter((_, i) => i !== index);
	}

	function newRate() {
		newRates = newRates.concat({
			to: newRates[newRates.length - 1].to,
			rate: newRates[newRates.length - 1].rate
		});
	}

	function saveRateAndClear() {
		const ratesToSave: RateData[] = newRates.map((rate, i) => ({
			from: getFrom(newRates, i),
			to: rate.to,
			taxRate: rate.rate / 100
		}));

		addRate({
			name: tableName!,
			rates: ratesToSave
		});

		newRates = [
			{
				to: 5000.65,
				rate: 10.35
			}
		];
		tableName = undefined;
		createModalOpen = false;
	}
</script>

<Button on:click={() => (createModalOpen = true)}>Adicionar Tabela Personalizada</Button>
<Modal title="Nova Tabela" bind:open={createModalOpen}>
	<Input
		type="text"
		class="w-2/5"
		placeholder="Nome da tabela"
		bind:value={tableName}
		minlength="1"
	/>
	<Table shadow>
		<TableHead>
			<TableHeadCell class="px-1 md:px-6">Escalão</TableHeadCell>
			<TableHeadCell class="px-0 md:px-6">Taxa Marginal</TableHeadCell>
			<TableHeadCell class="px-1 md:pe-6">Actions</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each newRates as rate, i}
				<TableBodyRow>
					<TableBodyCell class="px-1 md:px-4">
						<span class="inline-flex items-center md:pe-0">
							<span class="min-w-1/3 inline-flex">
								<Input
									type="number"
									class="rounded-none rounded-s-lg"
									value={getFrom(newRates, i)}
									disabled
								/>
								<span
									class="rounded-s-0 inline-flex items-center rounded-e-md border border-s-0 border-gray-300 bg-gray-200 px-1 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400 md:px-3"
								>
									€
								</span>
							</span>

							<span class="w-1/5 text-center text-xs md:text-sm">-</span>

							<span class="min-w-1/3 inline-flex">
								<Input
									type="number"
									min={getFrom(newRates, i)}
									class="rounded-none rounded-s-lg"
									bind:value={rate.to}
									on:change={() => bindRates(newRates)}
								/>
								<span
									class="rounded-s-0 inline-flex items-center rounded-e-md border border-s-0 border-gray-300 bg-gray-200 px-1 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400 md:px-3"
								>
									€
								</span>
							</span>
						</span>
					</TableBodyCell>
					<TableBodyCell class="px-0 md:px-6">
						<span class="inline-flex">
							<Input
								type="number"
								min="0"
								max="100"
								class="rounded-none rounded-s-lg"
								bind:value={rate.rate}
								required
							/>
							<span
								class="rounded-s-0 inline-flex items-center rounded-e-md border border-s-0 border-gray-300 bg-gray-200 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400 md:px-3"
							>
								%
							</span>
						</span>
					</TableBodyCell>
					<TableBodyCell class="px-1 md:px-3 text-center md:text-start">
						{#if i !== 0}
							<Button class="!p-2" on:click={() => removeRate(i)}
								><TrashBinOutline class="h-6 w-6" /></Button
							>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<div class="flex w-full justify-center">
		<Button class="!p-2" on:click={() => newRate()}><PlusOutline class="h-6 w-6" /></Button>
	</div>
	<Button on:click={() => saveRateAndClear()} disabled={validationResult}>Criar Tabela</Button>

	{#if validationResult}
		<Alert class="flex justify-center">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			{validationResult}</Alert
		>
	{/if}
</Modal>

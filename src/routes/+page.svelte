<script lang="ts">
	import CreateRates from '$lib/component/create-rates.svelte';
	import DeductionsInput from '$lib/component/inputs/deductions-input.svelte';
	import DependentsInput from '$lib/component/inputs/dependents-input.svelte';
	import SalaryInput from '$lib/component/inputs/salary-input.svelte';
	import SpecialRegimes from '$lib/component/inputs/special-regimes.svelte';
	import IrsChart from '$lib/component/irs-chart.svelte';
	import IrsTable from '$lib/component/irs-table.svelte';
	import { Accordion, AccordionItem } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Calculadora IRS</title>
</svelte:head>

<div class="mx-auto flex max-w-2xl flex-col gap-6 py-8">
	<h1 class="text-center text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
		Calculadora de IRS Anual
	</h1>
	<Accordion>
		<AccordionItem open>
			<span slot="header">Informações Base</span>
			<SalaryInput />
		</AccordionItem>
		<AccordionItem>
			<span slot="header">Dependentes</span>
			<DependentsInput />
		</AccordionItem>
		<AccordionItem>
			<span slot="header">Deduções</span>
			<DeductionsInput />
		</AccordionItem>
		<AccordionItem>
			<span slot="header">Regimes Especiais</span>
			<SpecialRegimes />
		</AccordionItem>
	</Accordion>
	<CreateRates />
</div>

<div class="flex flex-col gap-5">
	<div class="flex flex-col justify-evenly gap-1 md:flex-row">
		<IrsTable index={0} />
		<IrsTable index={1} />
	</div>

	<div>
		<IrsChart />
	</div>
</div>

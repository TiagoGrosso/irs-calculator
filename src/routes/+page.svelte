<script lang="ts">
	import DependentsInput from '$lib/component/inputs/dependents-input.svelte';
	import SalaryInput from '$lib/component/inputs/salary-input.svelte';
	import IrsChart from '$lib/component/irs-chart.svelte';
	import IrsTable from '$lib/component/irs-table.svelte';
	import { Accordion, AccordionItem } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Calculadora IRS</title>
</svelte:head>

<div class="mx-auto max-w-2xl py-10 py-8">
	<h1 class="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl text-center my-8">
		Calculadora de IRS Anual
	</h1>
	<Accordion>
		<AccordionItem open>
			<span slot="header">Informações Base</span>
			<SalaryInput />
		</AccordionItem>
		<AccordionItem >
			<span slot="header">Dependentes</span>
			<DependentsInput />
		</AccordionItem>
	</Accordion>
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

<script lang="ts">
	import IrsChart from '$lib/component/irs-chart.svelte';
	import IrsTable from '$lib/component/irs-table.svelte';
	import Intro from '$lib/component/top.svelte';
	import { getAvailableRates, typeToRates } from '$lib/stores/rates-store';

	let annualIncome: number = 15000;
	$: specificDeductions = Math.max(4104, annualIncome * 0.11);
	$: collectibleIncome = Math.max(0, annualIncome - specificDeductions);
	$: availableRates = getAvailableRates($typeToRates);

	let defaultSelectedSet = false;
	let firstSelected: string;
	let secondSelected: string;

	$: {
		if (!defaultSelectedSet) {
			firstSelected = availableRates[1]?.name as string;
			secondSelected = availableRates[2]?.name as string;
			defaultSelectedSet = true;
		}
	}
</script>

<svelte:head>
	<title>Calculadora IRS</title>
</svelte:head>

<Intro bind:annualIncome />

<div class="flex flex-col gap-5">
	<div class="flex flex-col justify-evenly gap-1 md:flex-row">
		<IrsTable bind:selectedValue={firstSelected} {collectibleIncome}></IrsTable>
		<IrsTable bind:selectedValue={secondSelected} {collectibleIncome}></IrsTable>
	</div>

	<div>
		<IrsChart
			{annualIncome}
			{collectibleIncome}
			{specificDeductions}
			firstRatesName={firstSelected}
			secondRatesName={secondSelected}
		/>
	</div>
</div>

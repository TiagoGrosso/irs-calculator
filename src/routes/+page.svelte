<script lang="ts">
	import IrsChart from '$lib/component/irs-chart.svelte';
	import IrsTable from '$lib/component/irs-table.svelte';
	import Intro from '$lib/component/top.svelte';
</script>

<svelte:head>
	<title>Calculadora IRS</title>
</svelte:head>

<Intro />

<div class="flex flex-col gap-5">
	<div class="flex flex-col justify-evenly gap-1 md:flex-row">
		<IrsTable index={0} />
		<IrsTable index={1} />
	</div>

	<div>
		<IrsChart />
	</div>
</div>

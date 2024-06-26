<script lang="ts">
	import { calcInput } from '$lib/stores/calc-input-store';
	import {
		collectibleIncome,
		deductions,
		specificDeductions
	} from '$lib/stores/derived-values-store';
	import { typeToRates } from '$lib/stores/rates-store';
	import { sumTax } from '$lib/types/Rate';
	import { Card, Chart, Tooltip } from 'flowbite-svelte';
	import { ArrowDownOutline, ArrowUpOutline, QuestionCircleSolid } from 'flowbite-svelte-icons';

	$: firstRates = $typeToRates.get($calcInput.selected[0]) ?? [];
	$: secondRates = $typeToRates.get($calcInput.selected[1]) ?? [];

	$: firstTotal = sumTax($collectibleIncome, firstRates);
	$: secondTotal = sumTax($collectibleIncome, secondRates);

	$: firstAmounts = firstRates.map((rate) => rate.getTaxAmount($collectibleIncome));
	$: secondAmounts = secondRates.map((rate) => rate.getTaxAmount($collectibleIncome));
	$: numLines = Array.from(
		{ length: Math.max(firstAmounts.length, secondAmounts.length) },
		(_, i) => i + 1
	).map((i) => `${i}º E.`);

	$: firstAnnualNetIncome = $calcInput.annualIncome * 0.89 - firstTotal;
	$: secondAnnualNetIncome = $calcInput.annualIncome * 0.89 - secondTotal;
	$: netIncomeDifference = secondAnnualNetIncome - firstAnnualNetIncome;
	$: netIncomeChange = netIncomeDifference / firstAnnualNetIncome;

	$: options = {
		series: [
			{
				name: $calcInput.selected[0],
				color: '#F05252',
				data: firstRates.map((rate) => rate.getTaxAmount($collectibleIncome))
			},
			{
				name: $calcInput.selected[1],
				color: '#31C48D',
				data: secondRates.map((rate) => rate.getTaxAmount($collectibleIncome))
			}
		],
		chart: {
			sparkline: {
				enabled: false
			},
			type: 'bar',
			width: '100%',
			height: 400,
			toolbar: {
				show: false
			}
		},
		fill: {
			opacity: 1
		},
		plotOptions: {
			bar: {
				horizontal: true,
				columnWidth: '100%',
				borderRadiusApplication: 'end',
				borderRadius: 6,
				dataLabels: {
					position: 'top'
				}
			}
		},
		legend: {
			show: true,
			position: 'bottom',
			labels: {
				useSeriesColors: true
			}
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: function (value: number) {
					return '€' + value.toFixed(2);
				}
			}
		},
		xaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				},
				formatter: function (value: string) {
					return '€' + value;
				}
			},
			categories: numLines,
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			}
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -20
			}
		}
	} satisfies ApexCharts.ApexOptions;
</script>

<Card size="none">
	<div
		class="flex flex-col justify-between gap-6 border-b border-gray-200 pb-3 dark:border-gray-700 md:flex-row"
	>
		<div class="flex gap-5">
			<div class="flex">
				<dl>
					<dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
						Salário Líquido - {$calcInput.selected[0]}
					</dt>
					<dd class="text-l font-bold leading-none text-gray-900 dark:text-white md:text-2xl">
						{`${firstAnnualNetIncome.toFixed(2)}€`}
					</dd>
				</dl>
			</div>
			<div class="flex">
				<dl>
					<dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
						Salário Líquido - {$calcInput.selected[1]}
					</dt>
					<dd class="text-l font-bold leading-none text-gray-900 dark:text-white md:text-2xl">
						{`${secondAnnualNetIncome.toFixed(2)}€`}
					</dd>
				</dl>
			</div>
			<div class="flex gap-1">
				<dl>
					<dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Diferença</dt>
					<dd class="text-l font-bold leading-none text-gray-900 dark:text-white md:text-2xl">
						{`${netIncomeDifference.toFixed(2)}€`}
					</dd>
				</dl>
				<div>
					{#if netIncomeChange > 0}
						<span
							class="gap-1items-center inline-flex rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
						>
							<ArrowUpOutline class="me-1.5 h-2.5 w-2.5" />
							{`${(netIncomeChange * 100).toFixed(2)}%`}
						</span>
					{:else}
						<span
							class="inline-flex items-center rounded-md bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
						>
							<ArrowDownOutline class="me-1.5 h-2.5 w-2.5" />
							{`${(netIncomeChange * 100).toFixed(2)}%`}
						</span>
					{/if}
				</div>
			</div>
			<QuestionCircleSolid />
			<Tooltip>Salário Líquido = Bruto - IRS - SS</Tooltip>
		</div>
		<div class="flex gap-5">
			<div class="flex">
				<dl>
					<dt
						id="specific-deductions"
						class="flex gap-1 pb-1 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						<span>Deduções Específicas</span>
						<QuestionCircleSolid />
					</dt>
					<Tooltip>Salário Bruto Anual x 0.11 (Mínimo 4104€)</Tooltip>
					<dd class="text-l font-bold leading-none text-gray-900 dark:text-white md:text-2xl">
						{`${$specificDeductions.toFixed(2)}€`}
					</dd>
				</dl>
			</div>
			<div class="flex">
				<dl>
					<dt
						id="deductions"
						class="flex gap-1 pb-1 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						<span>Deduções à Coleta</span>
						<QuestionCircleSolid />
					</dt>
					<Tooltip>Soma de todas as deduções por dependentes, despesas e regimes especiais</Tooltip>
					<dd class="text-l font-bold leading-none text-gray-900 dark:text-white md:text-2xl">
						{`${$deductions.toFixed(2)}€`}
					</dd>
				</dl>
			</div>
			<div class="flex">
				<dl>
					<dt class="flex gap-1 pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
						<span>Rendimento à Coleta</span>
						<QuestionCircleSolid />
					</dt>
					<Tooltip
						>Parte do salario sujeito a IRS = Salário Bruto Anual - Deduções Específicas - Deduções
						à Coleta</Tooltip
					>
					<dd class="text-l font-bold leading-none text-gray-900 dark:text-white md:text-2xl">
						{`${$collectibleIncome.toFixed(2)}€`}
					</dd>
				</dl>
			</div>
		</div>
	</div>

	<div class="flex justify-center align-middle">
		<h3 class="my-4">Comparação de imposto (por escalão)</h3>
	</div>

	<Chart {options} />
</Card>

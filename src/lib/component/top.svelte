<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import CreateRates from './create-rates.svelte';

	export let annualIncome: number;
</script>

<div>
	<div class="mx-auto max-w-2xl py-10 py-8">
		<div class="text-center">
			<h1 class="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
				Calculadora de IRS Anual
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Introduz o teu salário bruto anual:
			</p>
			<div class="mt-2 flex flex-col gap-3 items-center justify-center gap-x-6">
				<form>
					<Input
						class="text-center"
						type="text"
						id="annualIncome"
						required
						bind:value={annualIncome}
					/>
				</form>
				<CreateRates />
			</div>
		</div>
	</div>
</div>

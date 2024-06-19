<script lang="ts">
	import { calcInput } from '$lib/stores/calc-input-store';
	import { Checkbox, Tooltip } from 'flowbite-svelte';
	import { QuestionCircleOutline } from 'flowbite-svelte-icons';
</script>

<div class="grid grid-cols-2">
	<span>
		<span class="inline-flex items-center gap-1 align-middle">
			<Checkbox bind:checked={$calcInput.specialRegimes.incapacity}>
				Portador de Deficiência
			</Checkbox>
            <QuestionCircleOutline />
		</span>
		<Tooltip>Dedução de 15% do salário bruto anual, com limite de 2500€</Tooltip>
	</span>
</div>

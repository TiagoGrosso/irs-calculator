import { calculateDependentDeductions } from '$lib/util/dependent-utils';
import { derived } from 'svelte/store';
import { calcInput } from './calc-input-store';

export const specificDeductions = derived(calcInput, ($calcInput) =>
	Math.max(4104, $calcInput.annualIncome * 0.11)
);

export const dependentDeductions = derived(calcInput, ($calcInput) =>
	calculateDependentDeductions($calcInput.dependents)
);

export const deductions = derived(
	dependentDeductions,
	($dependentDeductions) => $dependentDeductions
);

export const collectibleIncome = derived(
	[calcInput, specificDeductions, deductions],
	([$calcInput, $specificDeductions, $deductions]) =>
		Math.max(0, $calcInput.annualIncome - $specificDeductions - $deductions)
);

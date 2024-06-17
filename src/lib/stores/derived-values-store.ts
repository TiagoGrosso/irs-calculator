import { calculateDependentDeductions } from '$lib/util/dependent-utils';
import { derived } from 'svelte/store';
import { calcInput } from './calc-input-store';

export const specificDeductions = derived(calcInput, ($calcInput) =>
	Math.max(4104, $calcInput.annualIncome * 0.11)
);

export const dependentDeductions = derived(calcInput, ($calcInput) =>
	calculateDependentDeductions($calcInput.dependents)
);

export const expenseDeductions = derived(calcInput, ($calcInput) =>
	$calcInput.expenses.map((e) => e.type.calcDeductions(e.amount ?? 0)).reduce((a, b) => a + b)
);

export const otherDeductions = derived(calcInput, ($calcInput) => $calcInput.otherDeductions ?? 0);

export const deductions = derived(
	[dependentDeductions, expenseDeductions, otherDeductions],
	([$dependentDeductions, $expenseDeductions, $otherDeductions]) =>
		$dependentDeductions + $expenseDeductions + $otherDeductions
);

export const collectibleIncome = derived(
	[calcInput, specificDeductions, deductions],
	([$calcInput, $specificDeductions, $deductions]) =>
		Math.max(0, $calcInput.annualIncome - $specificDeductions - $deductions)
);

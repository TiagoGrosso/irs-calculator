import { derived, writable } from 'svelte/store';
import { calcInput } from './calc-input-store';
import { getAvailableRates } from './rates-store';

export const specificDeductions = derived(calcInput, ($calcInput) =>
	Math.max(4104, $calcInput.annualIncome * 0.11)
);
export const collectibleIncome = derived(
	[calcInput, specificDeductions],
	([$calcInput, $specificDeductions]) => Math.max(0, $calcInput.annualIncome - $specificDeductions)
);

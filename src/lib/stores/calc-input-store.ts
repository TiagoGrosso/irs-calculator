import type { CalcInput } from '$lib/types/CalcInput';
import { writable } from 'svelte/store';

export const calcInput = writable({
	annualIncome: 15000,
	selected: ['IRS 2025 (Pré Alteração)', 'IRS 2025 (Pós Alteração)']
} as CalcInput);

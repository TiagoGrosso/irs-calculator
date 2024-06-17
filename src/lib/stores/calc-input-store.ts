import type { CalcInput } from '$lib/types/CalcInput';
import { ExpenseType } from '$lib/types/Expenses';
import { writable } from 'svelte/store';

export const calcInput = writable<CalcInput>({
	annualIncome: 15000,
	selected: ['IRS 2025 (Pré Alteração)', 'IRS 2025 (Pós Alteração)'],
	dependents: [],
	expenses: Object.values(ExpenseType).map((type) => ({ type, amount: 0 })),
	otherDeductions: 0
});

export function deleteDependent(index: number) {
	calcInput.update((cur) => ({
		...cur,
		dependents: cur.dependents.toSpliced(index, 1)
	}));
}

export function addDependent(age: number) {
	calcInput.update((cur) => ({
		...cur,
		dependents: cur.dependents.concat(age)
	}));
}

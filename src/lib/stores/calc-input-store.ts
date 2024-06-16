import type { CalcInput } from '$lib/types/CalcInput';
import { A } from 'flowbite-svelte';
import { writable } from 'svelte/store';

export const calcInput = writable<CalcInput>({
	annualIncome: 15000,
	selected: ['IRS 2025 (Pré Alteração)', 'IRS 2025 (Pós Alteração)'],
	dependents: []
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

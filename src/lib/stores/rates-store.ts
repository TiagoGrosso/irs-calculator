import { browser } from '$app/environment';
import type { RateDataAndName } from '$lib/types/Rate';
import { Rate } from '$lib/types/Rate';
import type { SelectOptionType } from 'flowbite-svelte';
import { persisted } from 'svelte-persisted-store';
import { get, writable } from 'svelte/store';

const irs2023: Rate[] = [
	new Rate(0.145, 0, 7479),
	new Rate(0.21, 7479, 11284),
	new Rate(0.265, 11284, 15992),
	new Rate(0.285, 15992, 20700),
	new Rate(0.35, 20700, 26355),
	new Rate(0.37, 26355, 38632),
	new Rate(0.435, 38632, 50483),
	new Rate(0.45, 50483, 78834),
	new Rate(0.48, 78834)
];

const irs2024Pre: Rate[] = [
	new Rate(0.1325, 0, 7703),
	new Rate(0.18, 7703, 11623),
	new Rate(0.23, 11623, 16472),
	new Rate(0.26, 16472, 21321),
	new Rate(0.3275, 21321, 27146),
	new Rate(0.37, 27146, 39791),
	new Rate(0.435, 39791, 51997),
	new Rate(0.45, 51997, 81199),
	new Rate(0.48, 81199)
];

const irs2024Post: Rate[] = [
	new Rate(0.1325, 0, 7703),
	new Rate(0.165, 7703, 11623),
	new Rate(0.22, 11623, 16472),
	new Rate(0.25, 16472, 21321),
	new Rate(0.32, 21321, 27146),
	new Rate(0.355, 27146, 39791),
	new Rate(0.435, 39791, 43000),
	new Rate(0.45, 43000, 80000),
	new Rate(0.48, 80000)
];

const irsJovem: Rate[] = [
	new Rate(0.0442, 0, 7703),
	new Rate(0.06, 7703, 11623),
	new Rate(0.0767, 11623, 16472),
	new Rate(0.0867, 16472, 21321),
	new Rate(0.1092, 21321, 27146),
	new Rate(0.1233, 27146, 39791),
	new Rate(0.145, 39791, 51997),
	new Rate(0.15, 51997, 81199),
	new Rate(0.48, 81199)
];

const defaultTypeToRates: Map<string, Rate[]> = new Map([
	['IRS 2024', irs2023],
	['IRS 2025 (Pré Alteração)', irs2024Pre],
	['IRS 2025 (Pós Alteração)', irs2024Post],
	['Proposta IRS Jovem', irsJovem]
]);

export const userRates = persisted('rates', [] as RateDataAndName[]);

export const typeToRates = writable(defaultTypeToRates);

userRates.subscribe((value) => {
	setRates(value);
});

function setRates(ratesData: RateDataAndName[]) {
	const updated = new Map(get(typeToRates));
	updated.clear();
	for (const defaultTypeToRate of defaultTypeToRates) {
		updated.set(defaultTypeToRate[0], defaultTypeToRate[1]);
	}

	for (const rateData of ratesData) {
		const rates = rateData.rates.map((rate) => new Rate(rate.taxRate, rate.from, rate.to));
		updated.set(rateData.name, rates);
	}

	typeToRates.set(updated);
}

export function addRate(rateData: RateDataAndName) {
	userRates.update((cur) => cur.concat(rateData));
}

export function getAvailableRates(rates: Map<string, Rate[]>): SelectOptionType<string>[] {
	return Array.from(rates.keys()).map((key) => ({ value: key, name: key }));
}

export function canDeleteRate(name: string) {
	return !defaultTypeToRates.has(name);
}

export function deleteRate(name: string) {
	userRates.update((cur) => cur.filter((r) => r.name !== name));
}

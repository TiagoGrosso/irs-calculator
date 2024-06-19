import type { Expense } from './Expenses';

export type CalcInput = {
	annualIncome: number;
	selected: string[];
	dependents: number[];
	expenses: Expense[];
	otherDeductions: number;
	specialRegimes: {
		incapacity: boolean
	}
};

export class ExpenseType {
	static readonly GENERAL = new ExpenseType(
		'Despesas Gerais e Familiares',
		'Dedução de 35% das despesas, limite de 250€',
		(i) => Math.min(250, i * 0.35)
	);
	static readonly HEALTH = new ExpenseType(
		'Despesas de Saúde',
		'Dedução de 15% das despesas, limite de 1000€',
		(i) => Math.min(1000, i * 0.15)
	);
	static readonly EDUCATION = new ExpenseType(
		'Despesas de Formação e Educação',
		'Dedução de 25% das depesas, limite de 800€',
		(i) => Math.min(800, i * 0.3)
	);
	static readonly RETIREMENT_HOMES = new ExpenseType(
		'Despesas de Lares',
		'Dedução de 25% das despesa, limite de 403.75€',
		(i) => Math.min(403.75, i * 0.25)
	);
	static readonly GYMS = new ExpenseType(
		'Despesas com Ginásios',
		'Dedução de 30% do IVA(6%) das despesas, limite de 250€',
		(i) => Math.min(250, i * 0.06 * 0.3)
	);

	private constructor(
		readonly name: string,
		readonly tooltip: string,
		readonly conversionFunction: (i: number) => number
	) {}

	public calcDeductions(amount: number): number {
		return this.conversionFunction(amount);
	}
}

export type Expense = {
	type: ExpenseType;
	amount: number;
};

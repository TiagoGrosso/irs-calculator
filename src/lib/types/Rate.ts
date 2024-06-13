export type RateData = { taxRate: number; from: number; to?: number };

export type RateDataAndName = {
	name: string;
	rates: RateData[];
};

export class Rate {
	constructor(
		private taxRate: number,
		private from: number,
		private to?: number
	) {}

	public getIntervalString(): string {
		if (!this.to) {
			return `>${this.from}€`;
		}
		return `${this.from}€ - ${this.to}€`;
	}

	public getTaxString(): string {
		return `${(this.taxRate * 100).toFixed(2)}%`;
	}

	public getTaxAmount(amount: number): number {
		return (
			Math.min((this.to ?? Infinity) - this.from, Math.max(0, amount - this.from)) * this.taxRate
		);
	}
}

export function sumTax(collectibleIncome: number, rates: Rate[]) {
	return rates
		.map((rate) => rate.getTaxAmount(collectibleIncome))
		.reduce((acc, cur) => acc + cur, 0);
}

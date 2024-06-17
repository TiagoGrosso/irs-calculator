export function calculateDependentDeductions(dependents: number[]): number {
	const numDependents = dependents.length;

	if (numDependents === 0) {
		return 0;
	}

	// 600€ per dependent
	const baseAmount = numDependents * 600;

	const orderedDependents = dependents.toSorted((a, b) => b - a);

	// If the first dependent is under 3 y.o, it's 726€ (600€ + 126€ bonus)
	const firstDependentBonus = orderedDependents[0] <= 3 ? 126 : 0;

	// Each dependent under 6 y.o, other than the first one, gets 900€ (600€ + 300€ bonus)
	const otherDependentBonus = orderedDependents.slice(1).filter((d) => d <= 6).length * 300;

	return baseAmount + firstDependentBonus + otherDependentBonus;
}

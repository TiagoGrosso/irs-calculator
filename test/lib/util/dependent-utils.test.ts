import { describe, expect, it } from 'vitest';
import { calculateDependentDeductions } from '../../../src/lib/util/dependent-utils';

describe('calculateDependentDeductions', () => {
	const scenarios = [
		{
			expected: 0,
			dependents: []
		},
		{
			expected: 600,
			dependents: [10]
		},
		{
			expected: 600 + 126,
			dependents: [3]
		},
		{
			expected: 600 + 900 + 900,
			dependents: [5, 15, 4]
		},
		{
			expected: 600 + 600 + 900,
			dependents: [15, 7, 4]
		},
		{
			expected: 600 + 126 + 900,
			dependents: [3, 2]
		}
	];

	for (let i = 0; i < scenarios.length; ++i) {
		const scenario = scenarios[i];
		it(`[${i}] calculates the correct amount`, () => {
			expect(calculateDependentDeductions(scenario.dependents)).toBe(scenario.expected);
		});
	}
});

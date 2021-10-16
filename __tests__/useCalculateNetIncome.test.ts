import { useCalculateNetIncome } from '../hooks'

describe('useCalculateNetIncome', () => {
    test('returns zero values if monthly gross income is lower than 700', () => {
        const expectedValue = {
            monthlyNetIncome: 0,
            annualNetIncome: 0,
            employeeContributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                unemploymentInsurance: 0,
                incomeTax: 0,
            },
        }
        expect(useCalculateNetIncome(600, 12, false, 0, 0)).toStrictEqual(
            expectedValue
        )
    })

    test('returns calculated net income', () => {
        const expectedValue = {
            monthlyNetIncome: 1933.22,
            annualNetIncome: 23198.64,
            employeeContributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(useCalculateNetIncome(2700, 12, false, 0, 0)).toStrictEqual(
            expectedValue
        )
    })

    test('returns calculated net income if severely disabled condition is present', () => {
        const expectedValue = {
            monthlyNetIncome: 1974.4,
            annualNetIncome: 23692.8,
            employeeContributions: {
                healthInsurance: 54,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 417.8,
            },
        }
        expect(useCalculateNetIncome(2700, 12, true, 0, 0)).toStrictEqual(
            expectedValue
        )
    })

    test('returns calculated net income if 1 child below six years old is taken into account', () => {
        const expectedValue = {
            monthlyNetIncome: 1979.66,
            annualNetIncome: 23755.92,
            employeeContributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(useCalculateNetIncome(2700, 12, false, 1, 0)).toStrictEqual(
            expectedValue
        )
    })

    test('returns calculated net income if 1 child above six years old is taken into account', () => {
        const expectedValue = {
            monthlyNetIncome: 1956.44,
            annualNetIncome: 23477.28,
            employeeContributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(useCalculateNetIncome(2700, 12, false, 0, 1)).toStrictEqual(
            expectedValue
        )
    })
})

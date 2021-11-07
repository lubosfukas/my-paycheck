import { useCalcNetIncome } from '../hooks'

describe('useCalcNetIncome', () => {
    test('should return zero values if monthly gross income is lower than 700', () => {
        const expectedValue = {
            monthlyIncome: 0,
            annualIncome: 0,
            contributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                unemploymentInsurance: 0,
                incomeTax: 0,
            },
        }
        expect(useCalcNetIncome({ monthlyGrossIncome: 600 })).toStrictEqual(
            expectedValue
        )
    })

    test('should return net income', () => {
        const expectedValue = {
            monthlyIncome: 1933.22,
            annualIncome: 23198.64,
            contributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(useCalcNetIncome({ monthlyGrossIncome: 2700 })).toStrictEqual(
            expectedValue
        )
    })

    test('should return net income if severely disabled condition is present', () => {
        const expectedValue = {
            monthlyIncome: 1974.4,
            annualIncome: 23692.8,
            contributions: {
                healthInsurance: 54,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 417.8,
            },
        }
        expect(
            useCalcNetIncome({
                monthlyGrossIncome: 2700,
                isSeverelyDisabled: true,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income if 1 child below six years old is taken into account', () => {
        const expectedValue = {
            monthlyIncome: 1979.66,
            annualIncome: 23755.92,
            contributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(
            useCalcNetIncome({
                monthlyGrossIncome: 2700,
                childrenBelowSix: 1,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income if 1 child above six years old is taken into account', () => {
        const expectedValue = {
            monthlyIncome: 1956.44,
            annualIncome: 23477.28,
            contributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(
            useCalcNetIncome({
                monthlyGrossIncome: 2700,
                childrenAboveSix: 1,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income for 8 months worked', () => {
        const expectedValue = {
            monthlyIncome: 1933.22,
            annualIncome: 15465.76,
            contributions: {
                healthInsurance: 108,
                socialInsurance: 253.8,
                medicareInsurance: 37.8,
                retirementInsurance: 108,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                incomeTax: 404.98,
            },
        }
        expect(
            useCalcNetIncome({ monthlyGrossIncome: 2700, monthsWorked: 8 })
        ).toStrictEqual(expectedValue)
    })
})

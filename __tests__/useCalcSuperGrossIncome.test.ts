import { useCalcSuperGrossIncome } from '../hooks'

describe('useCalcSuperGrossIncome', () => {
    test('should return zero values if input value is lower than 700', () => {
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
                guaranteeFund: 0,
                reserveFund: 0,
                injuryInsurance: 0,
            },
        }
        expect(
            useCalcSuperGrossIncome({ monthlyGrossIncome: 600 })
        ).toStrictEqual(expectedValue)
    })

    test('should return super gross income', () => {
        const expectedValue = {
            monthlyIncome: 3650.4,
            annualIncome: 43804.8,
            contributions: {
                healthInsurance: 270,
                socialInsurance: 680.4,
                medicareInsurance: 37.8,
                retirementInsurance: 378,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                guaranteeFund: 6.75,
                reserveFund: 128.25,
                injuryInsurance: 21.6,
            },
        }
        expect(
            useCalcSuperGrossIncome({ monthlyGrossIncome: 2700 })
        ).toStrictEqual(expectedValue)
    })

    test('should return super gross income for 8 months worked', () => {
        const expectedValue = {
            monthlyIncome: 3650.4,
            annualIncome: 29203.2,
            contributions: {
                healthInsurance: 270,
                socialInsurance: 680.4,
                medicareInsurance: 37.8,
                retirementInsurance: 378,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                guaranteeFund: 6.75,
                reserveFund: 128.25,
                injuryInsurance: 21.6,
            },
        }
        expect(
            useCalcSuperGrossIncome({
                monthlyGrossIncome: 2700,
                monthsWorked: 8,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return super gross income if severely disabled condition is present', () => {
        const expectedValue = {
            monthlyIncome: 3515.4,
            annualIncome: 42184.8,
            contributions: {
                healthInsurance: 135,
                socialInsurance: 680.4,
                medicareInsurance: 37.8,
                retirementInsurance: 378,
                disabilityInsurance: 81,
                unemploymentInsurance: 27,
                guaranteeFund: 6.75,
                reserveFund: 128.25,
                injuryInsurance: 21.6,
            },
        }
        expect(
            useCalcSuperGrossIncome({
                monthlyGrossIncome: 2700,
                isSeverelyDisabled: true,
            })
        ).toStrictEqual(expectedValue)
    })
})

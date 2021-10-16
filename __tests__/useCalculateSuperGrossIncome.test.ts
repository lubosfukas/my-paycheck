import { useCalculateSuperGrossIncome } from '../hooks'

describe('useCalculateSuperGrossIncome', () => {
    test('returns zero values if input value is lower than 700', () => {
        const expectedValue = {
            monthlySuperGrossIncome: 0,
            annualSuperGrossIncome: 0,
            employerContributions: {
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
            useCalculateSuperGrossIncome({ monthlyGrossIncome: 600 })
        ).toStrictEqual(expectedValue)
    })

    test('returns calculated super gross income', () => {
        const expectedValue = {
            monthlySuperGrossIncome: 3650.4,
            annualSuperGrossIncome: 43804.8,
            employerContributions: {
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
            useCalculateSuperGrossIncome({ monthlyGrossIncome: 2700 })
        ).toStrictEqual(expectedValue)
    })
})

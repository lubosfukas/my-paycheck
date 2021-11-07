import { useCalcContractNetIncome } from '../hooks'

describe('useCalcContractNetIncome', () => {
    test('should return zero values if monthly gross income is lower than 700', () => {
        const expectedValue = {
            averageIncome: 0,
            firstYearAverageIncome: 0,
            firstYearIncome: 0,
            income: 0,
            manDayRate: 0,
            manHourRate: 0,
            contributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                reserveFund: 0,
                incomeTax: 0,
            },
        }
        expect(useCalcContractNetIncome({ monthlyIncome: 600 })).toStrictEqual(
            expectedValue
        )
    })

    test('should return net income', () => {
        const expectedValue = {
            averageIncome: 2682.51,
            firstYearAverageIncome: 2980.66,
            firstYearIncome: 3406.47,
            income: 3065.73,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: {
                healthInsurance: 143.9,
                socialInsurance: 340.74,
                medicareInsurance: 45.23,
                retirementInsurance: 185.02,
                disabilityInsurance: 61.67,
                reserveFund: 48.82,
                incomeTax: 100.03,
            },
        }
        expect(
            useCalcContractNetIncome({ monthlyIncome: 3650.4 })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income if severely disabled condition is present', () => {
        const expectedValue = {
            averageIncome: 2732.69,
            firstYearAverageIncome: 3030.83,
            firstYearIncome: 3463.81,
            income: 3123.07,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: {
                healthInsurance: 76.44,
                socialInsurance: 340.74,
                medicareInsurance: 45.23,
                retirementInsurance: 185.02,
                disabilityInsurance: 61.67,
                reserveFund: 48.82,
                incomeTax: 110.15,
            },
        }
        expect(
            useCalcContractNetIncome({
                monthlyIncome: 3650.4,
                isSeverelyDisabled: true,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income if 1 child below six years old is taken into account', () => {
        const expectedValue = {
            averageIncome: 2688.61,
            firstYearAverageIncome: 2986.76,
            firstYearIncome: 3413.44,
            income: 3072.7,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: {
                healthInsurance: 143.9,
                socialInsurance: 340.74,
                medicareInsurance: 45.23,
                retirementInsurance: 185.02,
                disabilityInsurance: 61.67,
                reserveFund: 48.82,
                incomeTax: 93.06,
            },
        }
        expect(
            useCalcContractNetIncome({
                monthlyIncome: 3650.4,
                childrenBelowSix: 1,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income if 1 child above six years old is taken into account', () => {
        const expectedValue = {
            averageIncome: 2685.57,
            firstYearAverageIncome: 2983.72,
            firstYearIncome: 3409.96,
            income: 3069.22,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: {
                healthInsurance: 143.9,
                socialInsurance: 340.74,
                medicareInsurance: 45.23,
                retirementInsurance: 185.02,
                disabilityInsurance: 61.67,
                reserveFund: 48.82,
                incomeTax: 96.54,
            },
        }
        expect(
            useCalcContractNetIncome({
                monthlyIncome: 3650.4,
                childrenAboveSix: 1,
            })
        ).toStrictEqual(expectedValue)
    })

    test('should return net income for 12 months worked', () => {
        const expectedValue = {
            averageIncome: 2874.22,
            firstYearAverageIncome: 3316.76,
            firstYearIncome: 3316.76,
            income: 2874.22,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: {
                healthInsurance: 186.89,
                socialInsurance: 442.54,
                medicareInsurance: 58.74,
                retirementInsurance: 240.29,
                disabilityInsurance: 80.1,
                reserveFund: 63.41,
                incomeTax: 146.75,
            },
        }
        expect(
            useCalcContractNetIncome({
                monthlyIncome: 3650.4,
                monthsWorked: 12,
            })
        ).toStrictEqual(expectedValue)
    })
})

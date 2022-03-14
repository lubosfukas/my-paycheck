import { calcContractNetIncome } from '../../../../hooks/useCalculate/utils/calcContractNetIncome'

describe('calcContractNetIncome', () => {
    test('returns zero values when monthly gross income is zero', () => {
        const expectedValue = {
            averageIncome: 0,
            firstYearAverageIncome: 0,
            firstYearIncome: 0,
            income: 0,
            laborCost: 0,
            manDayRate: 0,
            manHourRate: 0,
            contributions: [
                {
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 14,
                },
                {
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 4.4,
                },
                {
                    label: 'Starobné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 18,
                },
                {
                    label: 'Invalidné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 6,
                },
                {
                    label: 'Rezervný fond',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 4.75,
                },
                {
                    label: 'Daň z príjmu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                },
                {
                    label: 'Spolu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 47.15,
                    isSum: true,
                    hasTax: true,
                },
            ],
            firstYearContributions: [
                {
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 14,
                },
                {
                    label: 'Daň z príjmu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                },
                {
                    label: 'Spolu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: 14,
                    isSum: true,
                    hasTax: true,
                },
            ],
        }

        expect(
            calcContractNetIncome({
                annualIncome: 0,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 10.5,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income', () => {
        const expectedValue = {
            averageIncome: 2515.68,
            firstYearAverageIncome: 2902.9,
            firstYearIncome: 3317.6,
            income: 2875.06,
            laborCost: 4171.89,
            manDayRate: 200.57,
            manHourRate: 25.07,
            contributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 704.88,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 58.74,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2883.48,
                    label: 'Starobné poistenie',
                    monthlyContributions: 240.29,
                    percentage: 18,
                },
                {
                    annualContributions: 961.2,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 80.1,
                    percentage: 6,
                },
                {
                    annualContributions: 760.92,
                    label: 'Rezervný fond',
                    monthlyContributions: 63.41,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1750.86,
                    label: 'Daň z príjmu',
                    monthlyContributions: 145.91,
                },
                {
                    annualContributions: 9304.08,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 775.34,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 1750.86,
                    label: 'Daň z príjmu',
                    monthlyContributions: 145.91,
                },
                {
                    annualContributions: 3993.6,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 332.8,
                    percentage: 14,
                },
            ],
        }

        expect(
            calcContractNetIncome({
                annualIncome: 43804.8,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 10.5,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income when severely disabled condition is present', () => {
        const expectedValue = {
            averageIncome: 2585.18,
            firstYearAverageIncome: 2972.4,
            firstYearIncome: 3397.03,
            income: 2954.49,
            laborCost: 4171.89,
            manDayRate: 200.57,
            manHourRate: 25.07,
            contributions: [
                {
                    annualContributions: 1121.4,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 93.45,
                    percentage: 7,
                },
                {
                    annualContributions: 704.88,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 58.74,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2883.48,
                    label: 'Starobné poistenie',
                    monthlyContributions: 240.29,
                    percentage: 18,
                },
                {
                    annualContributions: 961.2,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 80.1,
                    percentage: 6,
                },
                {
                    annualContributions: 760.92,
                    label: 'Rezervný fond',
                    monthlyContributions: 63.41,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1919.05,
                    label: 'Daň z príjmu',
                    monthlyContributions: 159.92,
                },
                {
                    annualContributions: 8350.92,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 695.91,
                    percentage: 40.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 1121.4,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 93.45,
                    percentage: 7,
                },
                {
                    annualContributions: 1919.05,
                    label: 'Daň z príjmu',
                    monthlyContributions: 159.92,
                },
                {
                    annualContributions: 3040.44,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 253.37,
                    percentage: 7,
                },
            ],
        }

        expect(
            calcContractNetIncome({
                annualIncome: 43804.8,
                isSeverelyDisabled: true,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                monthsWorked: 10.5,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income when one child below six years old is taken into account', () => {
        const expectedValue = {
            averageIncome: 2521.87,
            firstYearAverageIncome: 2909.1,
            firstYearIncome: 3324.68,
            income: 2882.14,
            laborCost: 4171.89,
            manDayRate: 200.57,
            manHourRate: 25.07,
            contributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 704.88,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 58.74,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2883.48,
                    label: 'Starobné poistenie',
                    monthlyContributions: 240.29,
                    percentage: 18,
                },
                {
                    annualContributions: 961.2,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 80.1,
                    percentage: 6,
                },
                {
                    annualContributions: 760.92,
                    label: 'Rezervný fond',
                    monthlyContributions: 63.41,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1666.01,
                    label: 'Daň z príjmu',
                    monthlyContributions: 138.83,
                },
                {
                    annualContributions: 9219.12,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 768.26,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 1666.01,
                    label: 'Daň z príjmu',
                    monthlyContributions: 138.83,
                },
                {
                    annualContributions: 3908.64,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 325.72,
                    percentage: 14,
                },
            ],
        }

        expect(
            calcContractNetIncome({
                annualIncome: 43804.8,
                childrenBelowSix: 1,
                childrenAboveSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 10.5,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income when one child above six years old is taken into account', () => {
        const expectedValue = {
            averageIncome: 2521.4,
            firstYearAverageIncome: 2908.62,
            firstYearIncome: 3324.14,
            income: 2881.6,
            laborCost: 4171.89,
            manDayRate: 200.57,
            manHourRate: 25.07,
            contributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 704.88,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 58.74,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2883.48,
                    label: 'Starobné poistenie',
                    monthlyContributions: 240.29,
                    percentage: 18,
                },
                {
                    annualContributions: 961.2,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 80.1,
                    percentage: 6,
                },
                {
                    annualContributions: 760.92,
                    label: 'Rezervný fond',
                    monthlyContributions: 63.41,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1672.38,
                    label: 'Daň z príjmu',
                    monthlyContributions: 139.37,
                },
                {
                    annualContributions: 9225.6,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 768.8,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 1672.38,
                    label: 'Daň z príjmu',
                    monthlyContributions: 139.37,
                },
                {
                    annualContributions: 3915.12,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 326.26,
                    percentage: 14,
                },
            ],
        }

        expect(
            calcContractNetIncome({
                annualIncome: 43804.8,
                childrenAboveSix: 1,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 10.5,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income for 12 months worked', () => {
        const expectedValue = {
            averageIncome: 2875.06,
            firstYearAverageIncome: 3317.6,
            firstYearIncome: 3317.6,
            income: 2875.06,
            laborCost: 3650.4,
            manDayRate: 175.5,
            manHourRate: 21.94,
            contributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 704.88,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 58.74,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2883.48,
                    label: 'Starobné poistenie',
                    monthlyContributions: 240.29,
                    percentage: 18,
                },
                {
                    annualContributions: 961.2,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 80.1,
                    percentage: 6,
                },
                {
                    annualContributions: 760.92,
                    label: 'Rezervný fond',
                    monthlyContributions: 63.41,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1750.86,
                    label: 'Daň z príjmu',
                    monthlyContributions: 145.91,
                },
                {
                    annualContributions: 9304.08,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 775.34,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 2242.68,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 186.89,
                    percentage: 14,
                },
                {
                    annualContributions: 1750.86,
                    label: 'Daň z príjmu',
                    monthlyContributions: 145.91,
                },
                {
                    annualContributions: 3993.6,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 332.8,
                    percentage: 14,
                },
            ],
        }

        expect(
            calcContractNetIncome({
                annualIncome: 43804.8,
                monthsWorked: 12,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
            })
        ).toStrictEqual(expectedValue)
    })
})

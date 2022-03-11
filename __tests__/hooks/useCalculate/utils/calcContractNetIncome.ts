import { calcContractNetIncome } from '../../../../hooks/useCalculate/utils/calcContractNetIncome'

describe('calcContractNetIncome', () => {
    test('returns zero values when monthly gross income is zero', () => {
        const expectedValue = {
            averageIncome: 0,
            firstYearAverageIncome: 0,
            firstYearIncome: 0,
            income: 0,
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
            averageIncome: 2682.51,
            firstYearAverageIncome: 2980.66,
            firstYearIncome: 3406.47,
            income: 3065.73,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: [
                {
                    annualContributions: 1726.8,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 143.9,
                    percentage: 14,
                },
                {
                    annualContributions: 542.76,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 45.23,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2220.24,
                    label: 'Starobné poistenie',
                    monthlyContributions: 185.02,
                    percentage: 18,
                },
                {
                    annualContributions: 740.04,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 61.67,
                    percentage: 6,
                },
                {
                    annualContributions: 585.84,
                    label: 'Rezervný fond',
                    monthlyContributions: 48.82,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1200.31,
                    label: 'Daň z príjmu',
                    monthlyContributions: 100.03,
                },
                {
                    annualContributions: 7016.04,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 584.67,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 1726.8,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 143.9,
                    percentage: 14,
                },
                {
                    annualContributions: 1200.31,
                    label: 'Daň z príjmu',
                    monthlyContributions: 100.03,
                },
                {
                    annualContributions: 2927.16,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 243.93,
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
            averageIncome: 2732.69,
            firstYearAverageIncome: 3030.83,
            firstYearIncome: 3463.81,
            income: 3123.07,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: [
                {
                    annualContributions: 917.28,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 76.44,
                    percentage: 7,
                },
                {
                    annualContributions: 542.76,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 45.23,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2220.24,
                    label: 'Starobné poistenie',
                    monthlyContributions: 185.02,
                    percentage: 18,
                },
                {
                    annualContributions: 740.04,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 61.67,
                    percentage: 6,
                },
                {
                    annualContributions: 585.84,
                    label: 'Rezervný fond',
                    monthlyContributions: 48.82,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1321.74,
                    label: 'Daň z príjmu',
                    monthlyContributions: 110.15,
                },
                {
                    annualContributions: 6327.96,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 527.33,
                    percentage: 40.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 917.28,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 76.44,
                    percentage: 7,
                },
                {
                    annualContributions: 1321.74,
                    label: 'Daň z príjmu',
                    monthlyContributions: 110.15,
                },
                {
                    annualContributions: 2239.08,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 186.59,
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
            averageIncome: 2688.61,
            firstYearAverageIncome: 2986.76,
            firstYearIncome: 3413.44,
            income: 3072.7,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: [
                {
                    annualContributions: 1726.8,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 143.9,
                    percentage: 14,
                },
                {
                    annualContributions: 542.76,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 45.23,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2220.24,
                    label: 'Starobné poistenie',
                    monthlyContributions: 185.02,
                    percentage: 18,
                },
                {
                    annualContributions: 740.04,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 61.67,
                    percentage: 6,
                },
                {
                    annualContributions: 585.84,
                    label: 'Rezervný fond',
                    monthlyContributions: 48.82,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1116.72,
                    label: 'Daň z príjmu',
                    monthlyContributions: 93.06,
                },
                {
                    annualContributions: 6932.4,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 577.7,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 1726.8,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 143.9,
                    percentage: 14,
                },
                {
                    annualContributions: 1116.72,
                    label: 'Daň z príjmu',
                    monthlyContributions: 93.06,
                },
                {
                    annualContributions: 2843.52,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 236.96,
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
            averageIncome: 2685.57,
            firstYearAverageIncome: 2983.72,
            firstYearIncome: 3409.96,
            income: 3069.22,
            manDayRate: 182.52,
            manHourRate: 22.82,
            contributions: [
                {
                    annualContributions: 1726.8,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 143.9,
                    percentage: 14,
                },
                {
                    annualContributions: 542.76,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 45.23,
                    percentage: 4.4,
                },
                {
                    annualContributions: 2220.24,
                    label: 'Starobné poistenie',
                    monthlyContributions: 185.02,
                    percentage: 18,
                },
                {
                    annualContributions: 740.04,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 61.67,
                    percentage: 6,
                },
                {
                    annualContributions: 585.84,
                    label: 'Rezervný fond',
                    monthlyContributions: 48.82,
                    percentage: 4.75,
                },
                {
                    annualContributions: 1158.52,
                    label: 'Daň z príjmu',
                    monthlyContributions: 96.54,
                },
                {
                    annualContributions: 6974.16,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 581.18,
                    percentage: 47.15,
                },
            ],
            firstYearContributions: [
                {
                    annualContributions: 1726.8,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 143.9,
                    percentage: 14,
                },
                {
                    annualContributions: 1158.52,
                    label: 'Daň z príjmu',
                    monthlyContributions: 96.54,
                },
                {
                    annualContributions: 2885.28,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 240.44,
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
            averageIncome: 2874.22,
            firstYearAverageIncome: 3316.76,
            firstYearIncome: 3316.76,
            income: 2874.22,
            manDayRate: 182.52,
            manHourRate: 22.82,
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
                    annualContributions: 1761.03,
                    label: 'Daň z príjmu',
                    monthlyContributions: 146.75,
                },
                {
                    annualContributions: 9314.16,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 776.18,
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
                    annualContributions: 1761.03,
                    label: 'Daň z príjmu',
                    monthlyContributions: 146.75,
                },
                {
                    annualContributions: 4003.68,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 333.64,
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

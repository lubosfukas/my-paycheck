import { calcNetIncome } from '../../../../hooks/useCalculate/utils/calcNetIncome'

describe('calcNetIncome', () => {
    test('returns zero values if monthly gross income is lower than 700', () => {
        const expectedValue = {
            monthlyIncome: 0,
            annualIncome: 0,
            contributions: [
                {
                    annualContributions: 0,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 0,
                    percentage: 4,
                },
                {
                    annualContributions: 0,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 0,
                    percentage: 1.4,
                },
                {
                    annualContributions: 0,
                    label: 'Starobné poistenie',
                    monthlyContributions: 0,
                    percentage: 4,
                },
                {
                    annualContributions: 0,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 0,
                    percentage: 3,
                },
                {
                    annualContributions: 0,
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 0,
                    percentage: 1,
                },
                {
                    annualContributions: 0,
                    label: 'Daň z príjmu',
                    monthlyContributions: 0,
                },
                {
                    annualContributions: 0,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 0,
                    percentage: 13.4,
                },
            ],
        }

        expect(
            calcNetIncome({
                monthlyGrossIncome: 600,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 12,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income', () => {
        const expectedValue = {
            monthlyIncome: 1935.48,
            annualIncome: 23225.76,
            contributions: [
                {
                    annualContributions: 1296,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 453.6,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 1296,
                    label: 'Starobné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 972,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 81,
                    percentage: 3,
                },
                {
                    annualContributions: 324,
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 27,
                    percentage: 1,
                },
                {
                    annualContributions: 4832.64,
                    label: 'Daň z príjmu',
                    monthlyContributions: 402.72,
                },
                {
                    annualContributions: 9174.24,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 764.52,
                    percentage: 13.4,
                },
            ],
        }

        expect(
            calcNetIncome({
                monthlyGrossIncome: 2700,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 12,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income if severely disabled condition is present', () => {
        const expectedValue = {
            monthlyIncome: 1976.66,
            annualIncome: 23719.92,
            contributions: [
                {
                    annualContributions: 648,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 54,
                    percentage: 2,
                },
                {
                    annualContributions: 453.6,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 1296,
                    label: 'Starobné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 972,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 81,
                    percentage: 3,
                },
                {
                    annualContributions: 324,
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 27,
                    percentage: 1,
                },
                {
                    annualContributions: 4986.48,
                    label: 'Daň z príjmu',
                    monthlyContributions: 415.54,
                },
                {
                    annualContributions: 8680.08,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 723.34,
                    percentage: 11.4,
                },
            ],
        }

        expect(
            calcNetIncome({
                monthlyGrossIncome: 2700,
                isSeverelyDisabled: true,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                monthsWorked: 12,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income if 1 child below six years old is taken into account', () => {
        const expectedValue = {
            monthlyIncome: 1982.62,
            annualIncome: 23791.44,
            contributions: [
                {
                    annualContributions: 1296,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 453.6,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 1296,
                    label: 'Starobné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 972,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 81,
                    percentage: 3,
                },
                {
                    annualContributions: 324,
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 27,
                    percentage: 1,
                },
                {
                    annualContributions: 4832.64,
                    label: 'Daň z príjmu',
                    monthlyContributions: 402.72,
                },
                {
                    annualContributions: 9174.24,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 764.52,
                    percentage: 13.4,
                },
            ],
        }

        expect(
            calcNetIncome({
                monthlyGrossIncome: 2700,
                childrenBelowSix: 1,
                childrenAboveSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 12,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income if 1 child above six years old is taken into account', () => {
        const expectedValue = {
            monthlyIncome: 1979.08,
            annualIncome: 23748.96,
            contributions: [
                {
                    annualContributions: 1296,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 453.6,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 1296,
                    label: 'Starobné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 972,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 81,
                    percentage: 3,
                },
                {
                    annualContributions: 324,
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 27,
                    percentage: 1,
                },
                {
                    annualContributions: 4832.64,
                    label: 'Daň z príjmu',
                    monthlyContributions: 402.72,
                },
                {
                    annualContributions: 9174.24,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 764.52,
                    percentage: 13.4,
                },
            ],
        }

        expect(
            calcNetIncome({
                monthlyGrossIncome: 2700,
                childrenAboveSix: 1,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthsWorked: 12,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns net income for 8 months worked', () => {
        const expectedValue = {
            monthlyIncome: 1935.48,
            annualIncome: 15483.84,
            contributions: [
                {
                    annualContributions: 864,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 302.4,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 864,
                    label: 'Starobné poistenie',
                    monthlyContributions: 108,
                    percentage: 4,
                },
                {
                    annualContributions: 648,
                    label: 'Invalidné poistenie',
                    monthlyContributions: 81,
                    percentage: 3,
                },
                {
                    annualContributions: 216,
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 27,
                    percentage: 1,
                },
                {
                    annualContributions: 3221.76,
                    label: 'Daň z príjmu',
                    monthlyContributions: 402.72,
                },
                {
                    annualContributions: 6116.16,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 764.52,
                    percentage: 13.4,
                },
            ],
        }

        expect(
            calcNetIncome({
                monthlyGrossIncome: 2700,
                monthsWorked: 8,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
            })
        ).toStrictEqual(expectedValue)
    })
})

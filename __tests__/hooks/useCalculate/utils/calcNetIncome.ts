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
            monthlyIncome: 1933.22,
            annualIncome: 23198.64,
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
                    annualContributions: 4859.76,
                    label: 'Daň z príjmu',
                    monthlyContributions: 404.98,
                },
                {
                    annualContributions: 9201.36,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 766.78,
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
            monthlyIncome: 1974.4,
            annualIncome: 23692.8,
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
                    annualContributions: 5013.6,
                    label: 'Daň z príjmu',
                    monthlyContributions: 417.8,
                },
                {
                    annualContributions: 8707.2,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 725.6,
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
            monthlyIncome: 1979.66,
            annualIncome: 23755.92,
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
                    annualContributions: 4859.76,
                    label: 'Daň z príjmu',
                    monthlyContributions: 404.98,
                },
                {
                    annualContributions: 9201.36,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 766.78,
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
            monthlyIncome: 1956.44,
            annualIncome: 23477.28,
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
                    annualContributions: 4859.76,
                    label: 'Daň z príjmu',
                    monthlyContributions: 404.98,
                },
                {
                    annualContributions: 9201.36,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 766.78,
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
            monthlyIncome: 1933.22,
            annualIncome: 15465.76,
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
                    annualContributions: 3239.84,
                    label: 'Daň z príjmu',
                    monthlyContributions: 404.98,
                },
                {
                    annualContributions: 6134.24,
                    hasTax: true,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 766.78,
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

import { useCalcSuperGrossIncome } from '../../hooks'

describe('useCalcSuperGrossIncome', () => {
    test('returns zero values if input value is lower than 700', () => {
        const expectedValue = {
            monthlyIncome: 0,
            annualIncome: 0,
            contributions: [
                {
                    annualContributions: 0,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 0,
                    percentage: 10,
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
                    percentage: 14,
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
                    label: 'Garančný fond',
                    monthlyContributions: 0,
                    percentage: 0.25,
                },
                {
                    annualContributions: 0,
                    label: 'Rezervný fond',
                    monthlyContributions: 0,
                    percentage: 4.75,
                },
                {
                    annualContributions: 0,
                    label: 'Úrazové poistenie',
                    monthlyContributions: 0,
                    percentage: 0.8,
                },
                {
                    annualContributions: 0,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 0,
                    percentage: 29.4,
                },
            ],
        }

        expect(
            useCalcSuperGrossIncome({ monthlyGrossIncome: 600 })
        ).toStrictEqual(expectedValue)
    })

    test('returns super gross income', () => {
        const expectedValue = {
            monthlyIncome: 3650.4,
            annualIncome: 43804.8,
            contributions: [
                {
                    annualContributions: 3240,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 270,
                    percentage: 10,
                },
                {
                    annualContributions: 453.6,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 4536,
                    label: 'Starobné poistenie',
                    monthlyContributions: 378,
                    percentage: 14,
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
                    annualContributions: 81,
                    label: 'Garančný fond',
                    monthlyContributions: 6.75,
                    percentage: 0.25,
                },
                {
                    annualContributions: 1539,
                    label: 'Rezervný fond',
                    monthlyContributions: 128.25,
                    percentage: 4.75,
                },
                {
                    annualContributions: 259.2,
                    label: 'Úrazové poistenie',
                    monthlyContributions: 21.6,
                    percentage: 1,
                },
                {
                    annualContributions: 11404.8,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 950.4,
                    percentage: 29.4,
                },
            ],
        }

        expect(
            useCalcSuperGrossIncome({ monthlyGrossIncome: 2700 })
        ).toStrictEqual(expectedValue)
    })

    test('returns super gross income for 8 months worked', () => {
        const expectedValue = {
            monthlyIncome: 3650.4,
            annualIncome: 29203.2,
            contributions: [
                {
                    annualContributions: 2160,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 270,
                    percentage: 10,
                },
                {
                    annualContributions: 302.4,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 3024,
                    label: 'Starobné poistenie',
                    monthlyContributions: 378,
                    percentage: 14,
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
                    annualContributions: 54,
                    label: 'Garančný fond',
                    monthlyContributions: 6.75,
                    percentage: 0.25,
                },
                {
                    annualContributions: 1026,
                    label: 'Rezervný fond',
                    monthlyContributions: 128.25,
                    percentage: 4.75,
                },
                {
                    annualContributions: 172.8,
                    label: 'Úrazové poistenie',
                    monthlyContributions: 21.6,
                    percentage: 1,
                },
                {
                    annualContributions: 7603.2,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 950.4,
                    percentage: 29.4,
                },
            ],
        }

        expect(
            useCalcSuperGrossIncome({
                monthlyGrossIncome: 2700,
                monthsWorked: 8,
            })
        ).toStrictEqual(expectedValue)
    })

    test('returns super gross income if severely disabled condition is present', () => {
        const expectedValue = {
            monthlyIncome: 3515.4,
            annualIncome: 42184.8,
            contributions: [
                {
                    annualContributions: 1620,
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 135,
                    percentage: 5,
                },
                {
                    annualContributions: 453.6,
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 37.8,
                    percentage: 1.4,
                },
                {
                    annualContributions: 4536,
                    label: 'Starobné poistenie',
                    monthlyContributions: 378,
                    percentage: 14,
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
                    annualContributions: 81,
                    label: 'Garančný fond',
                    monthlyContributions: 6.75,
                    percentage: 0.25,
                },
                {
                    annualContributions: 1539,
                    label: 'Rezervný fond',
                    monthlyContributions: 128.25,
                    percentage: 4.75,
                },
                {
                    annualContributions: 259.2,
                    label: 'Úrazové poistenie',
                    monthlyContributions: 21.6,
                    percentage: 1,
                },
                {
                    annualContributions: 9784.8,
                    isSum: true,
                    label: 'Spolu',
                    monthlyContributions: 815.4,
                    percentage: 24.4,
                },
            ],
        }

        expect(
            useCalcSuperGrossIncome({
                monthlyGrossIncome: 2700,
                isSeverelyDisabled: true,
            })
        ).toStrictEqual(expectedValue)
    })
})

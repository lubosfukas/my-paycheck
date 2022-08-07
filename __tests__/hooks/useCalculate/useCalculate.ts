import { act, renderHook } from '@testing-library/react-hooks'

import { useCalculate } from '../../../hooks'

describe('useCalculate', () => {
    test('returns calculated income', () => {
        const { result } = renderHook(() =>
            useCalculate({
                childrenAboveFifteen: 0,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthlyGrossIncome: 2700,
                monthsWorked: 12,
            })
        )

        expect(result.current.annualNetIncome).toStrictEqual(0)
        expect(result.current.annualSuperGrossIncome).toStrictEqual(0)
        expect(result.current.contractIncome).toStrictEqual(0)
        expect(result.current.contractManDayRate).toStrictEqual(0)
        expect(result.current.contractManHourRate).toStrictEqual(0)
        expect(result.current.firstYearContractIncome).toStrictEqual(0)
        expect(result.current.monthlyNetIncome).toStrictEqual(0)
        expect(result.current.monthlySuperGrossIncome).toStrictEqual(0)

        expect(result.current.employeeContributions).toStrictEqual([
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
        ])

        expect(result.current.employerContributions).toStrictEqual([
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
                percentage: 1,
            },
            {
                annualContributions: 0,
                isSum: true,
                label: 'Spolu',
                monthlyContributions: 0,
                percentage: 29.4,
            },
        ])

        expect(result.current.contractContributions).toStrictEqual([
            {
                annualContributions: 0,
                label: 'Zdravotné poistenie',
                monthlyContributions: 0,
                percentage: 14,
            },
            {
                annualContributions: 0,
                label: 'Nemocenské poistenie',
                monthlyContributions: 0,
                percentage: 4.4,
            },
            {
                annualContributions: 0,
                label: 'Starobné poistenie',
                monthlyContributions: 0,
                percentage: 18,
            },
            {
                annualContributions: 0,
                label: 'Invalidné poistenie',
                monthlyContributions: 0,
                percentage: 6,
            },
            {
                annualContributions: 0,
                label: 'Rezervný fond',
                monthlyContributions: 0,
                percentage: 4.75,
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
                percentage: 47.15,
            },
        ])

        expect(result.current.firstYearContractContributions).toStrictEqual([
            {
                annualContributions: 0,
                label: 'Zdravotné poistenie',
                monthlyContributions: 0,
                percentage: 14,
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
                percentage: 14,
            },
        ])

        act(() => result.current.calculate())

        expect(result.current.annualNetIncome).toStrictEqual(23225.76)
        expect(result.current.annualSuperGrossIncome).toStrictEqual(43804.8)
        expect(result.current.contractIncome).toStrictEqual(2875.06)
        expect(result.current.contractManDayRate).toStrictEqual(200.57)
        expect(result.current.contractManHourRate).toStrictEqual(25.07)
        expect(result.current.firstYearContractIncome).toStrictEqual(3317.6)
        expect(result.current.monthlyNetIncome).toStrictEqual(1935.48)
        expect(result.current.monthlySuperGrossIncome).toStrictEqual(3650.4)

        expect(result.current.employeeContributions).toStrictEqual([
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
        ])

        expect(result.current.employerContributions).toStrictEqual([
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
        ])

        expect(result.current.contractContributions).toStrictEqual([
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
        ])

        expect(result.current.firstYearContractContributions).toStrictEqual([
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
        ])
    })
})

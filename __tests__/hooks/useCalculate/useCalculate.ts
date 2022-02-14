import { act, renderHook } from '@testing-library/react-hooks'
import { useCalculate } from '../../../hooks'

describe('useCalculate', () => {
    test('returns calculated income', () => {
        const { result } = renderHook(() =>
            useCalculate({ monthlyGrossIncome: 2700 })
        )

        expect(result.current.annualNetIncome).toStrictEqual(0)
        expect(result.current.annualSuperGrossIncome).toStrictEqual(0)
        expect(result.current.contractAverageIncome).toStrictEqual(0)
        expect(result.current.contractIncome).toStrictEqual(0)
        expect(result.current.contractManDayRate).toStrictEqual(0)
        expect(result.current.contractManHourRate).toStrictEqual(0)
        expect(result.current.firstYearContractAverageIncome).toStrictEqual(0)
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

        expect(result.current.annualNetIncome).toStrictEqual(23198.64)
        expect(result.current.annualSuperGrossIncome).toStrictEqual(43804.8)
        expect(result.current.contractAverageIncome).toStrictEqual(2682.51)
        expect(result.current.contractIncome).toStrictEqual(3065.73)
        expect(result.current.contractManDayRate).toStrictEqual(182.52)
        expect(result.current.contractManHourRate).toStrictEqual(22.82)
        expect(result.current.firstYearContractAverageIncome).toStrictEqual(
            2980.66
        )
        expect(result.current.firstYearContractIncome).toStrictEqual(3406.47)
        expect(result.current.monthlyNetIncome).toStrictEqual(1933.22)
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
        ])

        expect(result.current.firstYearContractContributions).toStrictEqual([
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
        ])
    })
})

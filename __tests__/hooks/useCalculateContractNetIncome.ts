import { act, renderHook } from '@testing-library/react-hooks'

import { useCalculateContractNetIncome } from '../../hooks'

describe('useCalculateContractNetIncome', () => {
    test('returns calculated income', () => {
        const { result } = renderHook(() =>
            useCalculateContractNetIncome({
                childrenAboveFifteen: 0,
                childrenAboveSix: 0,
                childrenBelowSix: 0,
                isSeverelyDisabled: false,
                monthlyIncome: 3700,
                monthsWorked: 12,
            })
        )

        expect(result.current.annualIncome).toStrictEqual(0)
        expect(result.current.annualNetIncome).toStrictEqual(0)
        expect(result.current.netIncome).toStrictEqual(0)
        expect(result.current.manDayRate).toStrictEqual(0)
        expect(result.current.manHourRate).toStrictEqual(0)
        expect(result.current.firstYearAnnualNetIncome).toStrictEqual(0)
        expect(result.current.firstYearNetIncome).toStrictEqual(0)

        expect(result.current.contributions).toStrictEqual([
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

        expect(result.current.firstYearContributions).toStrictEqual([
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

        expect(result.current.annualIncome).toStrictEqual(44400)
        expect(result.current.annualNetIncome).toStrictEqual(34846.08)
        expect(result.current.netIncome).toStrictEqual(2903.84)
        expect(result.current.manDayRate).toStrictEqual(177.88)
        expect(result.current.manHourRate).toStrictEqual(22.24)
        expect(result.current.firstYearAnnualNetIncome).toStrictEqual(40289.4)
        expect(result.current.firstYearNetIncome).toStrictEqual(3357.45)

        expect(result.current.contributions).toStrictEqual([
            {
                annualContributions: 2298.84,
                label: 'Zdravotné poistenie',
                monthlyContributions: 191.57,
                percentage: 14,
            },
            {
                annualContributions: 722.52,
                label: 'Nemocenské poistenie',
                monthlyContributions: 60.21,
                percentage: 4.4,
            },
            {
                annualContributions: 2955.6,
                label: 'Starobné poistenie',
                monthlyContributions: 246.3,
                percentage: 18,
            },
            {
                annualContributions: 985.2,
                label: 'Invalidné poistenie',
                monthlyContributions: 82.1,
                percentage: 6,
            },
            {
                annualContributions: 780,
                label: 'Rezervný fond',
                monthlyContributions: 65,
                percentage: 4.75,
            },
            {
                annualContributions: 1811.79,
                label: 'Daň z príjmu',
                monthlyContributions: 150.98,
            },
            {
                annualContributions: 9553.92,
                hasTax: true,
                isSum: true,
                label: 'Spolu',
                monthlyContributions: 796.16,
                percentage: 47.15,
            },
        ])

        expect(result.current.firstYearContributions).toStrictEqual([
            {
                annualContributions: 2298.84,
                label: 'Zdravotné poistenie',
                monthlyContributions: 191.57,
                percentage: 14,
            },
            {
                annualContributions: 1811.79,
                label: 'Daň z príjmu',
                monthlyContributions: 150.98,
            },
            {
                annualContributions: 4110.6,
                hasTax: true,
                isSum: true,
                label: 'Spolu',
                monthlyContributions: 342.55,
                percentage: 14,
            },
        ])
    })
})

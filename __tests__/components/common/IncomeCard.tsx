import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import {
    hasDecimal,
    countDecimals,
} from '../../../components/common/IncomeCard/IncomeSection'
import { ContributionsTable, IncomeCard } from '../../../components'
import { RefType } from '../../../types'

const setup = () => {
    window.scrollTo = jest.fn()
    const ref = React.createRef<RefType>()

    render(
        <IncomeCard
            ref={ref}
            title="Zamestnanie"
            description="Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere."
            content={[
                {
                    label: 'Čistý mesačný príjem',
                    value: 1935.48,
                    cash: true,
                    colored: true,
                },
                {
                    label: 'Odpracované mesiace',
                    value: 12,
                    cash: false,
                    colored: false,
                },
                {
                    label: 'Superhrubý ročný príjem',
                    value: 43804.8,
                    cash: true,
                    colored: false,
                },
            ]}
            additional={[
                {
                    id: 'employee-contributions',
                    label: 'Odvody zamestnanca',
                    content: (
                        <ContributionsTable
                            id="employee-contributions"
                            contributions={[
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
                            ]}
                        />
                    ),
                },
                {
                    id: 'employer-contributions',
                    label: 'Odvody zamestnávateľa',
                    content: (
                        <ContributionsTable
                            id="employer-contributions"
                            contributions={[
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
                            ]}
                        />
                    ),
                },
            ]}
        />
    )
}

describe('hasDecimal', () => {
    test('returns true', () => {
        expect(hasDecimal(10.5)).toBeTruthy()
    })

    test('returns false', () => {
        expect(hasDecimal(10)).toBeFalsy()
    })
})

describe('countDecimals', () => {
    test('returns number of decimals if number is decimal', () => {
        expect(countDecimals(10.5)).toBe(1)
    })

    test('returns zero if number is not decimal', () => {
        expect(countDecimals(10)).toBe(0)
    })
})

describe('IncomeCard', () => {
    test('renders component', async () => {
        setup()

        expect(
            screen.getByRole('heading', { name: 'Zamestnanie' })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere.'
            )
        ).toBeInTheDocument()

        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(await screen.findByText('1935.48€')).toBeVisible()

        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(await screen.findByText('12')).toBeVisible()

        expect(screen.getByText('Superhrubý ročný príjem')).toBeInTheDocument()
        expect(await screen.findByText('43804.80€')).toBeVisible()

        expect(
            screen.getByRole('button', { name: 'Odvody zamestnanca' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Odvody zamestnávateľa' })
        ).toBeInTheDocument()
    })

    test('renders employee contributions table', () => {
        setup()

        const employeeContributionsButton = screen.getByRole('button', {
            name: 'Odvody zamestnanca',
        })
        expect(employeeContributionsButton).toBeInTheDocument()
        fireEvent.click(employeeContributionsButton)

        expect(screen.getAllByRole('cell', { name: 'Mesačne' })).toHaveLength(2)
        expect(screen.getAllByRole('cell', { name: 'Ročne' })).toHaveLength(2)
        expect(
            screen.getByRole('cell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '4.00%' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '108.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '1296.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '1.40%' })).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '37.80€' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '453.60€' })
        ).toBeInTheDocument()
    })

    test('renders employer contributions table', () => {
        setup()

        const employerContributionsButton = screen.getByRole('button', {
            name: 'Odvody zamestnávateľa',
        })
        expect(employerContributionsButton).toBeInTheDocument()
        fireEvent.click(employerContributionsButton)

        expect(screen.getAllByRole('cell', { name: 'Mesačne' })).toHaveLength(2)
        expect(screen.getAllByRole('cell', { name: 'Ročne' })).toHaveLength(2)
        expect(
            screen.getByRole('cell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '10.00%' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '270.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '3240.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '1.40%' })).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '37.80€' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '453.60€' })
        ).toBeInTheDocument()
    })
})

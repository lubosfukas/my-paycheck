import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { EmploymentCard } from '../../../components'
import { RefType } from '../../../types'

const setup = () => {
    const ref = React.createRef<RefType>()

    render(
        <EmploymentCard
            ref={ref}
            monthlyNetIncome={1935.48}
            annualSuperGrossIncome={43804.8}
            employeeContributions={[
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
            employerContributions={[
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
    )
}

describe('EmploymentCard', () => {
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

        expect(
            screen.getAllByRole('gridcell', { name: 'Mesačne' })
        ).toHaveLength(2)
        expect(screen.getAllByRole('gridcell', { name: 'Ročne' })).toHaveLength(
            2
        )
        expect(
            screen.getByRole('gridcell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '4.00%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '108.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '1296.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '1.40%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '37.80€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '453.60€' })
        ).toBeInTheDocument()
    })

    test('renders employer contributions table', () => {
        setup()

        const employerContributionsButton = screen.getByRole('button', {
            name: 'Odvody zamestnávateľa',
        })
        expect(employerContributionsButton).toBeInTheDocument()
        fireEvent.click(employerContributionsButton)

        expect(
            screen.getAllByRole('gridcell', { name: 'Mesačne' })
        ).toHaveLength(2)
        expect(screen.getAllByRole('gridcell', { name: 'Ročne' })).toHaveLength(
            2
        )
        expect(
            screen.getByRole('gridcell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '10.00%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '270.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '3240.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '1.40%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '37.80€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '453.60€' })
        ).toBeInTheDocument()
    })
})

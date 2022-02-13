import { fireEvent, render, screen } from '@testing-library/react'

import { FirstYearContractCard } from '../../../components'

const setup = () =>
    render(
        <FirstYearContractCard
            averageNetIncome={2980.66}
            contributions={[
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
            ]}
            netIncome={3406.47}
        />
    )

describe('FirstYearContractCard', () => {
    test('renders component', async () => {
        setup()

        expect(
            screen.getByRole('heading', { name: 'Živnosť v prvom roku' })
        ).toBeInTheDocument()
        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(await screen.findByText('3406.47€')).toBeVisible()
        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(await screen.findByText('10.5')).toBeVisible()
        expect(
            screen.getByText('Priemerný čistý mesačný príjem')
        ).toBeInTheDocument()
        expect(await screen.findByText('2980.66€')).toBeVisible()
        expect(
            screen.getByRole('button', { name: 'Odvody a daň' })
        ).toBeInTheDocument()
    })

    test('renders contributions table', () => {
        setup()

        const contributionsButton = screen.getByRole('button', {
            name: 'Odvody a daň',
        })
        expect(contributionsButton).toBeInTheDocument()
        fireEvent.click(contributionsButton)

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
            screen.getByRole('gridcell', { name: '14.00%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '143.90€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '1726.80€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '4.40%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '45.23€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '542.76€' })
        ).toBeInTheDocument()
    })
})

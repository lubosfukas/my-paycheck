import { fireEvent, render, screen } from '@testing-library/react'

import { ContractCard } from '../../../components'

const setup = () =>
    render(
        <ContractCard
            averageNetIncome={2515.68}
            contributions={[
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
                    annualContributions: 2947.56,
                    label: 'Spolu',
                    monthlyContributions: 245.63,
                    percentage: 18.4,
                    hasTax: true,
                    isSum: true,
                },
            ]}
            netIncome={2875.06}
        />
    )

describe('ContractCard', () => {
    test('renders component', async () => {
        setup()

        expect(
            screen.getByRole('heading', { name: 'Živnosť po prvom roku' })
        ).toBeInTheDocument()

        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(await screen.findByText('2875.06€')).toBeVisible()

        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(await screen.findByText('10.5')).toBeInTheDocument()

        expect(
            screen.getByText('Priemerný čistý mesačný príjem')
        ).toBeInTheDocument()
        expect(await screen.findByText('2515.68€')).toBeVisible()

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
        ).toHaveLength(3)
        expect(screen.getAllByRole('gridcell', { name: 'Ročne' })).toHaveLength(
            3
        )
        expect(
            screen.getByRole('gridcell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '14.00%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '186.89€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '2242.68€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '4.40%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '58.74€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '704.88€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Spolu' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Daň + 18.40%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '245.63€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '2947.56€' })
        ).toBeInTheDocument()
    })
})

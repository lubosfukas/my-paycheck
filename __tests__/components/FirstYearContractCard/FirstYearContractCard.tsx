import { fireEvent, render, screen } from '@testing-library/react'

import { FirstYearContractCard } from '../../../components'

const setup = () =>
    render(
        <FirstYearContractCard
            averageNetIncome={2902.9}
            contributions={[
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
                    label: 'Spolu',
                    monthlyContributions: 332.8,
                    percentage: 14,
                    hasTax: true,
                    isSum: true,
                },
            ]}
            netIncome={3317.6}
        />
    )

describe('FirstYearContractCard', () => {
    test('renders component', async () => {
        setup()

        expect(
            screen.getByRole('heading', { name: 'Živnosť v prvom roku' })
        ).toBeInTheDocument()
        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(await screen.findByText('3317.60€')).toBeVisible()
        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(await screen.findByText('10.5')).toBeVisible()
        expect(
            screen.getByText('Priemerný čistý mesačný príjem')
        ).toBeInTheDocument()
        expect(await screen.findByText('2902.90€')).toBeVisible()
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
            screen.getByRole('gridcell', { name: 'Daň z príjmu' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '145.91€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '1750.86€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Spolu' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: 'Daň + 14.00%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '332.80€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '3993.60€' })
        ).toBeInTheDocument()
    })
})

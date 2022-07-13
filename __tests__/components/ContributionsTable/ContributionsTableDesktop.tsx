import { render, screen } from '@testing-library/react'

import { ContributionsTableDesktop } from '../../../components/common/ContributionsTable/ContributionsTableDesktop'

const mockedData = {
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
            annualContributions: 6134.24,
            hasTax: true,
            isSum: true,
            label: 'Spolu',
            monthlyContributions: 766.78,
            percentage: 13.4,
        },
    ],
}

describe('ContributionsTableDesktop', () => {
    test('renders component', () => {
        render(
            <ContributionsTableDesktop
                id="test-contributions-table"
                contributions={mockedData.contributions}
            />
        )

        expect(screen.getByText('Odvody')).toBeInTheDocument()
        expect(screen.getByText('%')).toBeInTheDocument()
        expect(screen.getByText('Mesačné')).toBeInTheDocument()
        expect(screen.getByText('Ročné')).toBeInTheDocument()

        expect(
            screen.getByRole('gridcell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '4.00' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '108.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '864.00€' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('gridcell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '1.40' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '37.80€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('gridcell', { name: '302.40€' })
        ).toBeInTheDocument()

        expect(screen.getByText('Spolu')).toBeInTheDocument()
        expect(screen.getByText('Daň + 13.40%')).toBeInTheDocument()
        expect(screen.getByText('766.78€')).toBeInTheDocument()
        expect(screen.getByText('6134.24€')).toBeInTheDocument()
    })
})

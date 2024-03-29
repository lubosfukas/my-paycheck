import { render, screen } from '@testing-library/react'

import { ContributionsTableMobile } from '../../../../components/common/ContributionsTable/ContributionsTableMobile'

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

describe('ContributionsTableMobile', () => {
    test('renders component', () => {
        render(
            <ContributionsTableMobile
                id="test-contributions-table"
                contributions={mockedData.contributions}
            />
        )

        expect(screen.getAllByText('Mesačne')).toHaveLength(3)
        expect(screen.getAllByText('Ročne')).toHaveLength(3)

        expect(
            screen.getByRole('cell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '4.00%' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '108.00€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '864.00€' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('cell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '1.40%' })).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: '37.80€' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '302.40€' })
        ).toBeInTheDocument()

        expect(screen.getByRole('cell', { name: 'Spolu' })).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: 'Daň + 13.40%' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '766.78€' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: '6134.24€' })
        ).toBeInTheDocument()
    })
})

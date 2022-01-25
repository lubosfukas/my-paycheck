import { render } from '@testing-library/react'

import { ContributionsTableDesktop } from '../../../components/ContributionsTable/ContributionsTableDesktop'

const mockData = {
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
        const { getByRole, getByText } = render(
            <ContributionsTableDesktop
                id="test-table"
                contributions={mockData.contributions}
            />
        )

        expect(getByText('Odvody')).toBeInTheDocument()
        expect(getByText('%')).toBeInTheDocument()
        expect(getByText('Mesačné')).toBeInTheDocument()
        expect(getByText('Ročné')).toBeInTheDocument()

        expect(
            getByRole('gridcell', { name: 'Zdravotné poistenie' })
        ).toBeInTheDocument()
        expect(getByRole('gridcell', { name: '4.00' })).toBeInTheDocument()
        expect(getByRole('gridcell', { name: '108.00€' })).toBeInTheDocument()
        expect(getByRole('gridcell', { name: '864.00€' })).toBeInTheDocument()

        expect(
            getByRole('gridcell', { name: 'Nemocenské poistenie' })
        ).toBeInTheDocument()
        expect(getByRole('gridcell', { name: '1.40' })).toBeInTheDocument()
        expect(getByRole('gridcell', { name: '37.80€' })).toBeInTheDocument()
        expect(getByRole('gridcell', { name: '302.40€' })).toBeInTheDocument()

        expect(getByText('Spolu')).toBeInTheDocument()
        expect(getByText('Daň + 13.40%')).toBeInTheDocument()
        expect(getByText('766.78€')).toBeInTheDocument()
        expect(getByText('6134.24€')).toBeInTheDocument()
    })
})

import { render, screen } from '@testing-library/react'

import { ContractCard } from '../../../components'

describe('ContractCard', () => {
    test('renders component', () => {
        render(
            <ContractCard
                averageNetIncome={0}
                contributions={[]}
                netIncome={0}
            />
        )

        expect(
            screen.getByRole('heading', { name: 'Živnosť po prvom roku' })
        ).toBeInTheDocument()
        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(
            screen.getByText('Priemerný čistý mesačný príjem')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Odvody a daň' })
        ).toBeInTheDocument()
    })
})

import { render, screen } from '@testing-library/react'

import { LaborCostCard } from '../../../components'

describe('LaborCostCard', () => {
    test('renders component', async () => {
        render(<LaborCostCard laborCost={4171.89} manDayRate={200.57} />)

        expect(
            screen.getByRole('heading', { name: 'Cena práce' })
        ).toBeInTheDocument()
        expect(screen.getByText('Cena práce na faktúru')).toBeInTheDocument()
        expect(await screen.findByText('4171.89€')).toBeVisible()
        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(await screen.findByText('10.5')).toBeVisible()
        expect(
            screen.getByText('Priemerný dňový rate v hrubom')
        ).toBeInTheDocument()
        expect(await screen.findByText('200.57€')).toBeVisible()
    })
})

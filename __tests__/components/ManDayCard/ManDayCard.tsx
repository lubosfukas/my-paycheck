import { render, screen } from '@testing-library/react'

import { ManDayCard } from '../../../components'

describe('ManDayCard', () => {
    test('renders component', () => {
        render(<ManDayCard laborCost={0} manDayRate={0} manHourRate={0} />)

        expect(
            screen.getByRole('heading', { name: 'Cena práce' })
        ).toBeInTheDocument()
        expect(screen.getByText('Cena práce na faktúru')).toBeInTheDocument()
        expect(
            screen.getByText('Priemerný dňový rate v hrubom')
        ).toBeInTheDocument()
        expect(
            screen.getByText('Priemerný hodinový rate v hrubom')
        ).toBeInTheDocument()
    })
})

import { render, screen } from '@testing-library/react'

import { ManDayCard } from '../../../components'

describe('ManDayCard', () => {
    test('renders component', async () => {
        render(
            <ManDayCard
                laborCost={3650.4}
                manDayRate={182.52}
                manHourRate={22.82}
            />
        )

        expect(
            screen.getByRole('heading', { name: 'Cena práce' })
        ).toBeInTheDocument()
        expect(screen.getByText('Cena práce na faktúru')).toBeInTheDocument()
        expect(await screen.findByText('3650.40€')).toBeVisible()
        expect(
            screen.getByText('Priemerný dňový rate v hrubom')
        ).toBeInTheDocument()
        expect(await screen.findByText('182.52€')).toBeVisible()
        expect(
            screen.getByText('Priemerný hodinový rate v hrubom')
        ).toBeInTheDocument()
        expect(await screen.findByText('22.82€')).toBeVisible()
    })
})

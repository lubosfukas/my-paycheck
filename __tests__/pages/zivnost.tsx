import { render, screen } from '@testing-library/react'

import Contract from '../../pages/zivnost'

describe('Contract', () => {
    test('renders page', async () => {
        render(<Contract />)

        expect(
            screen.getByRole('heading', {
                name: 'Živnosť',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Tento nástroj vypočítava čistý príjem zo živnosti počas prvého roku aj nasledujúcich rokov.'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(
                'Zadajte mesačný príjem na faktúru (min. 1000€)'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Vypočítať' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Rozšírené zadanie' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Cena práce' })
        ).toBeInTheDocument()
        expect(screen.getByText('Dňový rate v hrubom')).toBeInTheDocument()
        expect(screen.getByText('Hodinový rate v hrubom')).toBeInTheDocument()
        expect(screen.getAllByText('0.00€')).toHaveLength(27)
        expect(screen.getByText('Suma fakturovaná za rok')).toBeInTheDocument()
        expect(screen.getAllByText('Odpracované mesiace')).toHaveLength(2)
        expect(await screen.findAllByText('12')).toHaveLength(2)

        expect(
            screen.getByRole('heading', { name: 'Živnosť v prvom roku' })
        ).toBeInTheDocument()
        expect(
            screen.getAllByText('Priemerný čistý mesačný príjem')
        ).toHaveLength(2)
        expect(
            screen.getAllByText('Priemerný čistý ročný príjem')
        ).toHaveLength(2)
        expect(
            screen.getAllByRole('button', { name: 'Odvody a daň' })
        ).toHaveLength(2)

        expect(
            screen.getByRole('heading', { name: 'Živnosť po prvom roku' })
        ).toBeInTheDocument()
    })
})

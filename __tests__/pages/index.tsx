import { render, screen } from '@testing-library/react'

import Home from '../../pages'

describe('Home', () => {
    test('renders page', () => {
        render(<Home />)

        expect(
            screen.getByRole('heading', {
                name: 'Zistite koľko by ste zarábali na živnosť',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Tento nástroj vypočítava sumu, ktorú by ste mali fakturovať, ak pracujete na živnosť z TPP tak, aby sa náklady zamestnávateľa nezvýšili.'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(
                'Zadajte hrubý mesačný príjem (min. 700€)'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Vypočítať' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Rozšírené zadanie' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Zamestnanie' })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere.'
            )
        ).toBeInTheDocument()
        expect(screen.getAllByText('Čistý mesačný príjem')).toHaveLength(3)
        expect(screen.getAllByText('Odpracované mesiace')).toHaveLength(3)
        expect(screen.getByText('Superhrubá mesačná mzda')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Odvody zamestnanca' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Odvody zamestnávateľa' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Cena práce' })
        ).toBeInTheDocument()
        expect(
            screen.getByText('Suma, ktorú by ste si mali fakturovať.')
        ).toBeInTheDocument()
        expect(screen.getByText('Cena práce na faktúru')).toBeInTheDocument()
        expect(
            screen.getByText('Priemerný dňový rate v hrubom')
        ).toBeInTheDocument()
        expect(
            screen.getByText('Priemerný hodinový rate v hrubom')
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Živnosť v prvom roku' })
        ).toBeInTheDocument()
        expect(
            screen.getAllByText('Priemerný čistý mesačný príjem')
        ).toHaveLength(2)
        expect(
            screen.getAllByRole('button', { name: 'Odvody a daň' })
        ).toHaveLength(2)

        expect(
            screen.getByRole('heading', { name: 'Živnosť po prvom roku' })
        ).toBeInTheDocument()
    })
})

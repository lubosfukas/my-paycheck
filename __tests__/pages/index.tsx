import { render, screen } from '@testing-library/react'

import Home from '../../pages'

describe('Home', () => {
    test('renders page', async () => {
        render(<Home />)

        expect(
            screen.getByRole('heading', {
                name: 'Porovnanie TPP a živnosti',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Tento nástroj vypočítava sumu, ktorú by ste mali fakturovať, ak prechádzate na živnosť z TPP tak, aby sa náklady zamestnávateľa nezvýšili.'
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
        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(screen.getAllByText('0.00€')).toHaveLength(60)
        expect(screen.getAllByText('Odpracované mesiace')).toHaveLength(3)
        expect(await screen.findByText('12')).toBeVisible()
        expect(await screen.findAllByText('10.5')).toHaveLength(2)
        expect(
            screen.getByText('Superhrubý mesačný príjem')
        ).toBeInTheDocument()
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
        expect(screen.getByText('Dňový rate v hrubom')).toBeInTheDocument()
        expect(screen.getAllByText('Suma fakturovaná za rok')).toHaveLength(3)

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

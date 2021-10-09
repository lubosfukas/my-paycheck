import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IncomeInput } from '../components'

describe('IncomeInput', () => {
    it('renders a component', () => {
        const { getByPlaceholderText, getByText } = render(
            <IncomeInput value="" onChange={jest.fn()} />
        )

        expect(
            getByText('Zistite koľko by ste zarábali na živnosť alebo s.r.o.')
        ).toBeInTheDocument()

        expect(
            getByPlaceholderText(
                'Zadajte svoj hrubý mesačný príjem (min. 700€)'
            )
        ).toBeInTheDocument()

        expect(getByText('Vypočítať')).toBeInTheDocument()

        expect(
            getByText(
                'Tento nástroj vypočítava sumu, ktorú by ste mali fakturovať, ak pracujete na živnosť alebo S.R.O. z TPP tak, aby sa náklady zamestnávateľa nezvýšili.'
            )
        ).toBeInTheDocument()
    })

    it('should not allow characters other than numbers to be inputted', () => {
        const { getByPlaceholderText } = render(
            <IncomeInput value="" onChange={jest.fn()} />
        )
        const input = getByPlaceholderText(
            'Zadajte svoj hrubý mesačný príjem (min. 700€)'
        )

        userEvent.type(input, 'foo')
        expect(input).not.toHaveValue('foo')
    })
})

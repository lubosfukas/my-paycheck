import { render } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { IncomeInput } from '../components'

describe('IncomeInput', () => {
    test('renders a component', () => {
        const { getByPlaceholderText, getByText } = render(
            <IncomeInput onConfirm={jest.fn()} />
        )
        const input = getByPlaceholderText(
            'Zadajte svoj hrubý mesačný príjem (min. 700€)'
        )
        const button = getByText('Vypočítať')

        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })

    test('should change value and enable button', () => {
        const { getByPlaceholderText, getByText } = render(
            <IncomeInput onConfirm={jest.fn()} />
        )
        const input = getByPlaceholderText(
            'Zadajte svoj hrubý mesačný príjem (min. 700€)'
        )
        const button = getByText('Vypočítať')

        expect(input).toHaveValue(null)
        expect(button).toBeDisabled()

        userEvent.type(input, '700')
        expect(input).toHaveValue(700)
        expect(button).not.toBeDisabled()
    })

    test('should not allow characters other than numbers to be inputted', () => {
        const { getByPlaceholderText } = render(
            <IncomeInput onConfirm={jest.fn()} />
        )
        const input = getByPlaceholderText(
            'Zadajte svoj hrubý mesačný príjem (min. 700€)'
        )

        expect(input).toHaveValue(null)
        userEvent.type(input, 'foo')
        expect(input).not.toHaveValue('foo')
        expect(input).toHaveValue(null)
    })

    test('should disable when value is below 700', () => {
        const { getByPlaceholderText, getByText } = render(
            <IncomeInput onConfirm={jest.fn()} />
        )

        const input = getByPlaceholderText(
            'Zadajte svoj hrubý mesačný príjem (min. 700€)'
        )
        const button = getByText('Vypočítať')

        expect(input).toHaveValue(null)
        expect(input).not.toHaveAttribute('aria-invalid', 'false')
        expect(button).toBeDisabled()

        userEvent.type(input, '800')
        expect(input).toHaveValue(800)
        expect(button).not.toBeDisabled()

        userEvent.clear(input)
        expect(input).toHaveValue(null)
        expect(button).toBeDisabled()

        userEvent.type(input, '600')
        expect(input).toHaveAttribute('aria-invalid', 'true')
        expect(button).toBeDisabled()
    })
})

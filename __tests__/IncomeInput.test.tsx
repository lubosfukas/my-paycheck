import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IncomeInput } from '../components'

describe('IncomeInput', () => {
    const setup = () => {
        const utils = render(<IncomeInput onConfirm={jest.fn()} />)
        const button = utils.getByText('Vypočítať')
        const input = utils.getByPlaceholderText(
            'Zadajte svoj hrubý mesačný príjem (min. 700€)'
        )

        return { button, input, utils }
    }

    test('renders component', () => {
        const { button, input } = setup()

        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })

    test('should change value and enable button', () => {
        const { button, input } = setup()

        expect(input).toHaveValue(null)
        expect(button).toBeDisabled()
        userEvent.type(input, '700')
        expect(input).toHaveValue(700)
        expect(button).not.toBeDisabled()
    })

    test('should not allow characters other than numbers to be inputted', () => {
        const { input } = setup()

        expect(input).toHaveValue(null)
        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })

    test('should disable when value is below 700', () => {
        const { button, input } = setup()

        expect(input).toHaveValue(null)
        expect(input).not.toHaveAttribute('aria-invalid', 'true')
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

import userEvent from '@testing-library/user-event'

import { IncomeInput } from '../../../components/common/IncomeInput'
import { render, screen } from '../../../utils/test'

describe('IncomeInput', () => {
    const setup = ({ onChange = jest.fn(), value = 0 } = {}) => {
        render(
            <IncomeInput
                placeholder="Zadajte hrubý mesačný príjem (min. 700€)"
                value={value}
                onChange={onChange}
            />
        )

        const input = screen.getByPlaceholderText(
            'Zadajte hrubý mesačný príjem (min. 700€)'
        )
        return { input }
    }

    test('renders component with empty value', () => {
        const { input } = setup()

        expect(input).not.toHaveAttribute('aria-invalid', 'true')
        expect(input).toHaveValue(null)
        expect(input).toBeInTheDocument()
    })

    test('renders component with value of 700', () => {
        const { input } = setup({ value: 700 })

        expect(input).not.toHaveAttribute('aria-invalid', 'true')
        expect(input).toHaveValue(700)
        expect(input).toBeInTheDocument()
    })

    test('changes value', () => {
        const onChange = jest.fn()
        const { input } = setup({ onChange })

        expect(input).toHaveValue(null)
        userEvent.type(input, '700')
        expect(onChange).toHaveBeenCalledWith(700)
    })

    test('allows no characters other than number to be inputted', () => {
        const { input } = setup()

        expect(input).toHaveValue(null)
        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })

    test('disables when value is below 700', () => {
        const { input } = setup({ value: 600 })

        expect(input).toHaveValue(600)
        expect(input).toHaveAttribute('aria-invalid', 'true')
    })
})

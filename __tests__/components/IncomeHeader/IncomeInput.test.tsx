import userEvent from '@testing-library/user-event'

import { IncomeInput } from '../../../components'
import { renderWithContext, screen } from '../../../utils/test'

describe('IncomeInput', () => {
    const setup = () => {
        renderWithContext(<IncomeInput />)

        const input = screen.getByPlaceholderText(
            'Zadajte hrubý mesačný príjem (min. 700€)'
        )

        return { input }
    }

    test('renders component', () => {
        const { input } = setup()

        expect(input).toBeInTheDocument()
    })

    test('changes value', () => {
        const { input } = setup()

        expect(input).toHaveValue(null)
        userEvent.type(input, '700')
        expect(input).toHaveValue(700)
    })

    test('allows no characters other than numbers to be inputted', () => {
        const { input } = setup()

        expect(input).toHaveValue(null)
        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })

    test('disables when value is below 700', () => {
        const { input } = setup()

        expect(input).toHaveValue(null)
        expect(input).not.toHaveAttribute('aria-invalid', 'true')

        userEvent.type(input, '800')
        expect(input).toHaveValue(800)

        userEvent.clear(input)
        expect(input).toHaveValue(null)

        userEvent.type(input, '600')
        expect(input).toHaveAttribute('aria-invalid', 'true')
    })
})

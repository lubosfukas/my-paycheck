import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CompanionIncomeInput } from '../components'
import { texts } from '../utils/texts'

describe('CompanionIncomeInput', () => {
    const setup = () => {
        const utils = render(<CompanionIncomeInput />)
        const toggle = utils.getByText(texts['companionIncomeInput.dontApply'])
        const input = utils.getByPlaceholderText(
            texts['companionIncomeInput.placeholder']
        )

        return { input, toggle, utils }
    }

    test('renders component', () => {
        const {
            utils: { getByPlaceholderText, getByText },
        } = setup()

        expect(
            getByText(texts['companionIncomeInput.label'])
        ).toBeInTheDocument()
        expect(
            getByText(texts['companionIncomeInput.dontApply'])
        ).toBeInTheDocument()
        expect(getByPlaceholderText(texts['companionIncomeInput.placeholder']))
    })

    test('should enable input on switch toggle', () => {
        const { input, toggle } = setup()

        expect(input).toBeDisabled()
        userEvent.click(toggle)
        expect(input).not.toBeDisabled()
        expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    test('should not allow characters other than numbers', () => {
        const { input, toggle } = setup()

        userEvent.click(toggle)
        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })

    test('should set input as valid after changing value', () => {
        const { input, toggle } = setup()

        userEvent.click(toggle)
        expect(input).toHaveAttribute('aria-invalid', 'true')
        userEvent.type(input, '500')
        expect(input).not.toHaveAttribute('aria-invalid', 'true')
    })

    test('should disable input after switch toggle', () => {
        const { input, toggle } = setup()

        expect(input).toBeDisabled()
        userEvent.click(toggle)
        expect(input).not.toBeDisabled()
        userEvent.click(toggle)
        expect(input).toBeDisabled()
    })

    test('should preserve value after re-enabling input', () => {
        const { input, toggle } = setup()

        expect(input).toHaveValue(null)
        userEvent.click(toggle)
        expect(input).toHaveValue(null)
        userEvent.type(input, '500')
        expect(input).toHaveValue(500)
        userEvent.click(toggle)
        expect(input).toHaveValue(500)
        userEvent.click(toggle)
        expect(input).toHaveValue(500)
    })
})

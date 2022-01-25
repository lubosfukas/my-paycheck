import userEvent from '@testing-library/user-event'

import { CompanionIncomeInput } from '../../../components/IncomeHeader/CompanionIncomeInput'
import { renderWithContext, screen } from '../../../utils/test'

const setup = () => {
    renderWithContext(<CompanionIncomeInput />)
    const toggle = screen.getByTestId('companion-income-input-switch')
    const input = screen.getByPlaceholderText('Príjem manželky/manžela')

    return { input, toggle }
}

describe('CompanionIncomeInput', () => {
    test('renders component', () => {
        setup()

        expect(
            screen.getByText('Nezdaniteľná časť na manželku/manžela')
        ).toBeInTheDocument()
        expect(screen.getByText('Nechcem uplatniť')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Príjem manželky/manžela'))
    })

    test('enables input on switch toggle', () => {
        const { input, toggle } = setup()

        expect(input).toBeDisabled()
        userEvent.click(toggle)
        expect(input).not.toBeDisabled()
    })

    test('allows no characters other than numbers', () => {
        const { input, toggle } = setup()

        userEvent.click(toggle)
        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })

    test('disables input after switch toggle', () => {
        const { input, toggle } = setup()

        expect(input).toBeDisabled()
        userEvent.click(toggle)
        expect(input).not.toBeDisabled()
        userEvent.click(toggle)
        expect(input).toBeDisabled()
    })

    test('preserves value after re-enabling input', () => {
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

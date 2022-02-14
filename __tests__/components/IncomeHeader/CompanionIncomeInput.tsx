import userEvent from '@testing-library/user-event'

import { CompanionIncomeInput } from '../../../components/IncomeHeader/CompanionIncomeInput'
import { renderWithContext, screen } from '../../../utils/test'

describe('CompanionIncomeInput', () => {
    test('renders component', () => {
        renderWithContext(<CompanionIncomeInput />)

        expect(
            screen.getByText('Nezdaniteľná časť na manželku/manžela')
        ).toBeInTheDocument()
        expect(screen.getByText('Nechcem uplatniť')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Príjem manželky/manžela'))
    })

    test('allows no characters other than numbers', () => {
        renderWithContext(<CompanionIncomeInput />)
        const input = screen.getByPlaceholderText('Príjem manželky/manžela')

        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })
})

import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { CompanionIncomeInput } from '../../../components'

describe('CompanionIncomeInput', () => {
    test('renders component empty value', () => {
        render(<CompanionIncomeInput value={undefined} onChange={jest.fn()} />)

        expect(
            screen.getByText('Nezdaniteľná časť na manželku/manžela')
        ).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Príjem manželky/manžela')
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue(null)
    })

    test('renders component with value 1000', () => {
        render(<CompanionIncomeInput value={1000} onChange={jest.fn()} />)

        expect(
            screen.getByText('Nezdaniteľná časť na manželku/manžela')
        ).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Príjem manželky/manžela')
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue(1000)
    })

    test('allows no characters other than number', () => {
        render(<CompanionIncomeInput value={undefined} onChange={jest.fn()} />)
        const input = screen.getByPlaceholderText('Príjem manželky/manžela')

        userEvent.type(input, 'foo')
        expect(input).toHaveValue(null)
    })
})

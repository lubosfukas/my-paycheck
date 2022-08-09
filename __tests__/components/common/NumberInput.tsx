import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { NumberInput } from '../../../components'

const setup = ({
    max = Infinity,
    min = -Infinity,
    setValue = jest.fn(),
} = {}) => {
    render(
        <NumberInput
            label="Deti pod 6 rokov (vrátane)"
            max={max}
            min={min}
            value={0}
            setValue={setValue}
        />
    )

    const input = screen.getByDisplayValue('0')
    const plusButton = screen.getByRole('button', { name: '+' })
    const minusButton = screen.getByRole('button', { name: '-' })

    return { input, minusButton, plusButton }
}

describe('NumberInput', () => {
    test('renders component', () => {
        setup()

        expect(
            screen.getByText('Deti pod 6 rokov (vrátane)')
        ).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
    })

    test('renders component with enabled minus button', () => {
        setup()

        const minusButton = screen.getByRole('button', { name: '-' })
        expect(minusButton).toBeInTheDocument()
        expect(minusButton).not.toBeDisabled()
    })

    test('renders component with disabled minus button', () => {
        const { minusButton } = setup({ min: 0 })

        expect(minusButton).toBeInTheDocument()
        expect(minusButton).toBeDisabled()
    })

    test('allows no characters or numbers to be typed', () => {
        const { input } = setup()

        expect(input).toHaveValue('0')
        userEvent.type(input, 'foo')
        expect(input).toHaveValue('0')
        userEvent.type(input, '5')
        expect(input).toHaveValue('0')
    })

    test('calls setValue function with correct parameter', () => {
        const setValue = jest.fn()
        const { input, plusButton } = setup({ setValue })

        expect(input).toHaveValue('0')
        userEvent.click(plusButton)
        expect(setValue).toBeCalledTimes(1)
        expect(setValue).toBeCalledWith(1)
    })
})

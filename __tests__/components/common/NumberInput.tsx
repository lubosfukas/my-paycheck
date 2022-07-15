import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NumberInput } from '../../../components'

const setup = () => {
    const setValue = jest.fn()
    render(
        <NumberInput
            label="Deti pod 6 rokov (vrátane)"
            setValue={setValue}
            value={0}
        />
    )

    const input = screen.getByDisplayValue('0')
    const plusButton = screen.getByRole('button', { name: '+' })
    const minusButton = screen.getByRole('button', { name: '-' })

    return { input, minusButton, plusButton, setValue }
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

    test('renders disabled minus button', () => {
        const { minusButton } = setup()

        expect(minusButton).toBeInTheDocument()
        expect(minusButton).toBeDisabled()
    })

    test('renders enabled minus button', () => {
        render(
            <NumberInput
                label="Deti pod 6 rokov (vrátane)"
                setValue={jest.fn()}
                value={1}
            />
        )

        const minusButton = screen.getByRole('button', { name: '-' })
        expect(minusButton).toBeInTheDocument()
        expect(minusButton).not.toBeDisabled()
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
        const { input, plusButton, setValue } = setup()

        expect(input).toHaveValue('0')
        userEvent.click(plusButton)
        expect(setValue).toBeCalledTimes(1)
        expect(setValue).toBeCalledWith(1)
    })
})

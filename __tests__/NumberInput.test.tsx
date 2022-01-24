import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NumberInput } from '../components'

describe('NumberInput', () => {
    const setup = () => {
        const setValue = jest.fn()
        const utils = render(
            <NumberInput
                label="Deti pod 6 rokov (vrátane)"
                value={0}
                setValue={setValue}
            />
        )

        const input = utils.getByDisplayValue('0')

        return { input, setValue, utils }
    }

    test('renders component', () => {
        const {
            utils: { getByDisplayValue, getByText },
        } = setup()

        expect(getByDisplayValue('0')).toBeInTheDocument()
        expect(getByText('Deti pod 6 rokov (vrátane)')).toBeInTheDocument()
    })

    test('should change value', () => {
        const { input } = setup()

        expect(input).toHaveValue(0)
        userEvent.type(input, '5')
        expect(input).toHaveValue(5)
    })

    test('should not allow characters other than numbers to be inputted', () => {
        const { input } = setup()

        expect(input).toHaveValue(0)
        userEvent.type(input, 'foo')
        expect(input).toHaveValue(0)
    })

    test('should call onChange event with default value after onBlur event if no value is present', () => {
        const { input, setValue } = setup()

        expect(input).toHaveValue(0)
        userEvent.clear(input)
        expect(input).toHaveValue(null)
        fireEvent.blur(input)
        expect(input).toHaveValue(0)
        expect(setValue).toBeCalledTimes(1)
        expect(setValue).toBeCalledWith(0)
    })

    test('should call onChange event with typed value after onBlur event', () => {
        const { input, setValue } = setup()

        expect(input).toHaveValue(0)
        userEvent.type(input, '5')
        expect(input).toHaveValue(5)
        fireEvent.blur(input)
        expect(setValue).toBeCalledTimes(1)
        expect(setValue).toBeCalledWith(5)
    })
})

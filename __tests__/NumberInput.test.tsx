import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NumberInput } from '../components'
import { texts } from '../utils/texts'

describe('NumberInput', () => {
    const setup = () => {
        const onChange = jest.fn()
        const utils = render(
            <NumberInput
                defaultValue={0}
                label={texts['childrenBelowSixInput.label']}
                min={0}
                onChange={onChange}
            />
        )

        const input = utils.getByDisplayValue('0')

        return { input, onChange, utils }
    }

    test('renders component', () => {
        const {
            utils: { getByDisplayValue, getByText },
        } = setup()

        expect(getByDisplayValue('0')).toBeInTheDocument()
        expect(
            getByText(texts['childrenBelowSixInput.label'])
        ).toBeInTheDocument()
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
        const { input, onChange } = setup()

        expect(input).toHaveValue(0)
        userEvent.clear(input)
        expect(input).toHaveValue(null)
        fireEvent.blur(input)
        expect(input).toHaveValue(0)
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(0)
    })

    test('should call onChange event with typed value after onBlur event', () => {
        const { input, onChange } = setup()

        expect(input).toHaveValue(0)
        userEvent.type(input, '5')
        expect(input).toHaveValue(5)
        fireEvent.blur(input)
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(5)
    })
})

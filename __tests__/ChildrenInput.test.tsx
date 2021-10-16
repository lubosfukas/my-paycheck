import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ChildrenInput } from '../components/IncomeInputHeader/OtherCriteria'

describe('ChildrenInput', () => {
    test('renders a component', () => {
        const { getByDisplayValue, getByText } = render(
            <ChildrenInput
                defaultValue={0}
                label="Deti pod 6 rokov (vrátane)"
                onChange={jest.fn()}
            />
        )

        expect(getByDisplayValue('0')).toBeInTheDocument()
        expect(getByText('Deti pod 6 rokov (vrátane)')).toBeInTheDocument()
    })

    test('should change value and enable button', () => {
        const { getByDisplayValue } = render(
            <ChildrenInput
                defaultValue={0}
                label="Deti pod 6 rokov (vrátane)"
                onChange={jest.fn()}
            />
        )

        const input = getByDisplayValue('0')

        expect(input).toHaveValue(0)
        userEvent.type(input, '5')
        expect(input).toHaveValue(5)
    })

    test('should not allow characters other than numbers to be inputted', () => {
        const { getByDisplayValue } = render(
            <ChildrenInput
                defaultValue={0}
                label="Deti pod 6 rokov (vrátane)"
                onChange={jest.fn()}
            />
        )

        const input = getByDisplayValue('0')

        expect(input).toHaveValue(0)
        userEvent.type(input, 'foo')
        expect(input).not.toHaveValue('foo')
        expect(input).toHaveValue(0)
    })

    test('should fill 0 after blur if no value is present', () => {
        const onChange = jest.fn()
        const { getByDisplayValue } = render(
            <ChildrenInput
                defaultValue={0}
                label="Deti pod 6 rokov (vrátane)"
                onChange={onChange}
            />
        )

        const input = getByDisplayValue('0')

        expect(input).toHaveValue(0)
        userEvent.clear(input)
        expect(input).toHaveValue(null)
        fireEvent.blur(input)
        expect(input).toHaveValue(0)
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(0)
    })

    test('should call onChange after blur', () => {
        const onChange = jest.fn()
        const { getByDisplayValue } = render(
            <ChildrenInput
                defaultValue={0}
                label="Deti pod 6 rokov (vrátane)"
                onChange={onChange}
            />
        )

        const input = getByDisplayValue('0')

        expect(input).toHaveValue(0)
        userEvent.type(input, '5')
        expect(input).toHaveValue(5)
        fireEvent.blur(input)
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(5)
    })
})

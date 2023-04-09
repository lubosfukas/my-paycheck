import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { SeverelyDisabledSwitch } from '../../../components'

describe('SeverelyDisabledSwitch', () => {
    test('renders component', () => {
        render(<SeverelyDisabledSwitch value={false} onChange={jest.fn()} />)

        expect(
            screen.getByText('Zdravotne ťažko postihnutý')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('severely-disabled-switch')
        ).toBeInTheDocument()
        expect(screen.getByText('Nie')).toBeInTheDocument()
    })

    test('calls onChange with new value after toggle switched', async () => {
        const onChange = jest.fn()
        render(<SeverelyDisabledSwitch value={false} onChange={onChange} />)

        const toggle = screen.getByTestId('severely-disabled-switch')

        await userEvent.click(toggle)
        expect(onChange).toBeCalledWith(true)
        expect(onChange).toBeCalledTimes(1)
    })
})

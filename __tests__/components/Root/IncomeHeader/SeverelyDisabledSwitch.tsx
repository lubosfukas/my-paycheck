import userEvent from '@testing-library/user-event'

import { SeverelyDisabledSwitch } from '../../../../components/Root/IncomeHeader/SeverelyDisabledSwitch'
import { render, screen } from '../../../../utils/test'

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

    test('calls onChange with new value after toggle switched', () => {
        const onChange = jest.fn()
        render(<SeverelyDisabledSwitch value={false} onChange={onChange} />)

        const toggle = screen.getByTestId('severely-disabled-switch')

        userEvent.click(toggle)
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(true)
    })
})

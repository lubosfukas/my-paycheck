import userEvent from '@testing-library/user-event'

import { SeverelyDisabledSwitch } from '../../../components/IncomeHeader/SeverelyDisabledSwitch'
import { renderWithContext, screen } from '../../../utils/test'

describe('SeverelyDisabledSwitch', () => {
    test('renders component', () => {
        renderWithContext(<SeverelyDisabledSwitch />)

        expect(
            screen.getByText('Zdravotne ťažko postihnutý')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('severely-disabled-switch')
        ).toBeInTheDocument()
        expect(screen.getByText('Nie')).toBeInTheDocument()
    })

    test('calls setIsSeverelyDisabled with correct parameter after change', () => {
        const setIsSeverelyDisabled = jest.fn()
        renderWithContext(<SeverelyDisabledSwitch />, {
            setIsSeverelyDisabled,
        })

        const toggle = screen.getByTestId('severely-disabled-switch')

        userEvent.click(toggle)
        expect(setIsSeverelyDisabled).toBeCalledTimes(1)
        expect(setIsSeverelyDisabled).toBeCalledWith(true)
    })
})

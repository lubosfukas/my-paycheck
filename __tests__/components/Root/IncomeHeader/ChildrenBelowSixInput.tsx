import userEvent from '@testing-library/user-event'

import { ChildrenBelowSixInput } from '../../../../components/Root/IncomeHeader/ChildrenBelowSixInput'
import { renderWithContext, screen } from '../../../../utils/test'

describe('ChildrenBelowSixInput', () => {
    test('renders component', () => {
        renderWithContext(<ChildrenBelowSixInput />)

        expect(
            screen.getByText('Počet detí pod 6 rokov (vrátane)')
        ).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
    })

    test('calls setChildrenBelowSix with correct parameter after change', () => {
        const setChildrenBelowSix = jest.fn()
        renderWithContext(<ChildrenBelowSixInput />, {
            childrenBelowSix: 1,
            setChildrenBelowSix,
        })

        const plusButton = screen.getByRole('button', { name: '+' })
        userEvent.click(plusButton)

        expect(setChildrenBelowSix).toBeCalledTimes(1)
        expect(setChildrenBelowSix).toBeCalledWith(2)
    })
})

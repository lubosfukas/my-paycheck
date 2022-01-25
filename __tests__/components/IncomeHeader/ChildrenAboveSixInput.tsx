import userEvent from '@testing-library/user-event'

import { ChildrenAboveSixInput } from '../../../components/IncomeHeader/ChildrenAboveSixInput'
import { renderWithContext, screen } from '../../../utils/test'

describe('ChildrenAboveSixInput', () => {
    test('renders component', () => {
        renderWithContext(<ChildrenAboveSixInput />)

        expect(screen.getByText('Počet detí nad 6 rokov')).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
    })

    test('calls setChildrenAboveSix with correct parameter after change', () => {
        const setChildrenAboveSix = jest.fn()
        renderWithContext(<ChildrenAboveSixInput />, {
            childrenAboveSix: 1,
            setChildrenAboveSix,
        })

        const minusButton = screen.getByRole('button', { name: '-' })
        userEvent.click(minusButton)

        expect(setChildrenAboveSix).toBeCalledTimes(1)
        expect(setChildrenAboveSix).toBeCalledWith(0)
    })
})

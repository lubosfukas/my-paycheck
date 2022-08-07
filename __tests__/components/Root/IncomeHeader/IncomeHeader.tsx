import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { IncomeHeader } from '../../../../components/Root/IncomeHeader/IncomeHeader'

const setup = ({
    childrenAboveFifteen = 0,
    childrenAboveSix = 0,
    childrenBelowSix = 0,
    companionIncome = undefined,
    isSeverelyDisabled = false,
    monthlyGrossIncome = 0,
    monthsWorked = 12,
    onConfirm = jest.fn(),
    setChildrenAboveFifteen = jest.fn(),
    setChildrenAboveSix = jest.fn(),
    setChildrenBelowSix = jest.fn(),
    setCompanionIncome = jest.fn(),
    setIsSeverelyDisabled = jest.fn(),
    setMonthlyGrossIncome = jest.fn(),
    setMonthsWorked = jest.fn(),
} = {}) => {
    render(
        <IncomeHeader
            childrenAboveFifteen={childrenAboveFifteen}
            childrenAboveSix={childrenAboveSix}
            childrenBelowSix={childrenBelowSix}
            companionIncome={companionIncome}
            isSeverelyDisabled={isSeverelyDisabled}
            monthlyGrossIncome={monthlyGrossIncome}
            monthsWorked={monthsWorked}
            onConfirm={onConfirm}
            setChildrenAboveFifteen={setChildrenAboveFifteen}
            setChildrenAboveSix={setChildrenAboveSix}
            setChildrenBelowSix={setChildrenBelowSix}
            setCompanionIncome={setCompanionIncome}
            setIsSeverelyDisabled={setIsSeverelyDisabled}
            setMonthlyGrossIncome={setMonthlyGrossIncome}
            setMonthsWorked={setMonthsWorked}
        />
    )
}

describe('IncomeHeader', () => {
    test('renders component', () => {
        setup()

        expect(
            screen.getByRole('heading', {
                name: 'Porovnanie TPP a živnosti',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Tento nástroj vypočítava sumu, ktorú by ste mali fakturovať, ak prechádzate na živnosť z TPP tak, aby sa náklady zamestnávateľa nezvýšili.'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(
                'Zadajte hrubý mesačný príjem (min. 700€)'
            )
        ).toBeInTheDocument()

        const calcButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(calcButton).toBeInTheDocument()
        expect(calcButton).toBeDisabled()

        const modalButton = screen.getByRole('button', {
            name: 'Rozšírené zadanie',
        })
        expect(modalButton).toBeInTheDocument()
        expect(modalButton).toBeDisabled()
    })

    test('calls onConfirm', () => {
        const onConfirm = jest.fn()
        setup({ onConfirm, monthlyGrossIncome: 2700 })

        const calcButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(calcButton).toBeInTheDocument()
        expect(calcButton).not.toBeDisabled()

        userEvent.click(calcButton)
        expect(onConfirm).toBeCalledTimes(1)
    })

    test('opens modal', () => {
        setup({ monthlyGrossIncome: 2700 })

        const modalButton = screen.getByRole('button', {
            name: 'Rozšírené zadanie',
        })
        expect(modalButton).toBeInTheDocument()
        expect(modalButton).not.toBeDisabled()

        userEvent.click(modalButton)
        expect(
            screen.getByRole('dialog', { name: 'Rozšírené zadanie' })
        ).toBeInTheDocument()
    })
})

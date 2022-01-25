import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IncomeHeader } from '../../../components/IncomeHeader/IncomeHeader'

describe('IncomeHeader', () => {
    test('renders component', () => {
        render(<IncomeHeader onConfirm={jest.fn()} />)

        expect(
            screen.getByRole('heading', {
                name: 'Zistite koľko by ste zarábali na živnosť',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText('Zistite koľko by ste zarábali na živnosť')
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
        render(<IncomeHeader onConfirm={onConfirm} />)

        const input = screen.getByPlaceholderText(
            'Zadajte hrubý mesačný príjem (min. 700€)'
        )
        expect(input).toBeInTheDocument()

        const calcButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(calcButton).toBeInTheDocument()
        expect(calcButton).toBeDisabled()

        userEvent.type(input, '2700')
        expect(calcButton).not.toBeDisabled()

        userEvent.click(calcButton)
        expect(onConfirm).toBeCalledTimes(1)
        expect(onConfirm).toBeCalledWith({
            monthlyGrossIncome: 2700,
            monthsWorked: 12,
            isSeverelyDisabled: false,
            childrenBelowSix: 0,
            childrenAboveSix: 0,
            companionIncome: undefined,
        })
    })

    test('opens modal', () => {
        render(<IncomeHeader onConfirm={jest.fn()} />)

        const input = screen.getByPlaceholderText(
            'Zadajte hrubý mesačný príjem (min. 700€)'
        )
        expect(input).toBeInTheDocument()

        const modalButton = screen.getByRole('button', {
            name: 'Rozšírené zadanie',
        })
        expect(modalButton).toBeInTheDocument()
        expect(modalButton).toBeDisabled()

        userEvent.type(input, '2700')
        expect(modalButton).not.toBeDisabled()

        userEvent.click(modalButton)
        expect(
            screen.getByRole('dialog', { name: 'Rozšírené zadanie' })
        ).toBeInTheDocument()
    })
})

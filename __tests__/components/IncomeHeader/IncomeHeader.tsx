import userEvent from '@testing-library/user-event'

import { IncomeHeader } from '../../../components/IncomeHeader/IncomeHeader'
import { renderWithContext, screen } from '../../../utils/test'

describe('IncomeHeader', () => {
    test('renders component', () => {
        renderWithContext(<IncomeHeader onConfirm={jest.fn()} />)

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
        renderWithContext(<IncomeHeader onConfirm={onConfirm} />, {
            monthlyGrossIncome: 2700,
        })

        const calcButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(calcButton).toBeInTheDocument()
        expect(calcButton).not.toBeDisabled()

        userEvent.click(calcButton)
        expect(onConfirm).toBeCalledTimes(1)
    })

    test('opens modal', () => {
        renderWithContext(<IncomeHeader onConfirm={jest.fn()} />, {
            monthlyGrossIncome: 2700,
        })

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

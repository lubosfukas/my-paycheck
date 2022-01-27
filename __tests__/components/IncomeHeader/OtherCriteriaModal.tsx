import userEvent from '@testing-library/user-event'
import { OtherCriteriaModal } from '../../../components/IncomeHeader/OtherCriteriaModal'
import { renderWithContext, screen } from '../../../utils/test'

describe('OtherCriteriaModal', () => {
    test('renders modal', () => {
        renderWithContext(
            <OtherCriteriaModal
                isOpen={true}
                onClose={jest.fn()}
                onConfirm={jest.fn()}
            />
        )

        expect(
            screen.getByRole('dialog', { name: 'Rozšírené zadanie' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Close' })
        ).toBeInTheDocument()

        const previousButton = screen.getByRole('button', {
            name: 'Predchádzajúci',
        })
        expect(previousButton).toBeInTheDocument()
        expect(previousButton).toBeDisabled()

        const nextButton = screen.getByRole('button', { name: 'Ďalej' })
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).not.toBeDisabled()
    })

    test('calls onClose', () => {
        const onClose = jest.fn()
        renderWithContext(
            <OtherCriteriaModal
                isOpen={true}
                onClose={onClose}
                onConfirm={jest.fn()}
            />
        )

        const closeButton = screen.getByRole('button', { name: 'Close' })
        userEvent.click(closeButton)
        expect(onClose).toBeCalledTimes(1)
    })

    test('renders next steps', () => {
        renderWithContext(
            <OtherCriteriaModal
                isOpen={true}
                onClose={jest.fn()}
                onConfirm={jest.fn()}
            />
        )

        expect(
            screen.getByText('Nezdaniteľná časť na manželku/manžela')
        ).toBeInTheDocument()
        expect(screen.getByText('Nechcem uplatniť')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Príjem manželky/manžela'))

        const previousButton = screen.getByRole('button', {
            name: 'Predchádzajúci',
        })
        expect(previousButton).toBeInTheDocument()
        expect(previousButton).toBeDisabled()

        const nextButton = screen.getByRole('button', { name: 'Ďalej' })
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).not.toBeDisabled()

        userEvent.click(nextButton)
        expect(previousButton).not.toBeDisabled()
        expect(
            screen.getByText('Počet detí pod 6 rokov (vrátane)')
        ).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()

        userEvent.click(nextButton)
        expect(screen.getByText('Počet detí nad 6 rokov')).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()

        userEvent.click(nextButton)
        expect(
            screen.getByText('Zdravotne ťažko postihnutý')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('severely-disabled-switch')
        ).toBeInTheDocument()
        expect(screen.getByText('Nie')).toBeInTheDocument()

        const confirmButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(confirmButton).toBeInTheDocument()
        expect(confirmButton).not.toBeDisabled()
    })

    test('calls onConfirm', () => {
        const onConfirm = jest.fn()
        renderWithContext(
            <OtherCriteriaModal
                isOpen={true}
                onClose={jest.fn()}
                onConfirm={onConfirm}
            />
        )

        const nextButton = screen.getByRole('button', { name: 'Ďalej' })
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).not.toBeDisabled()

        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)

        const confirmButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(confirmButton).toBeInTheDocument()
        expect(confirmButton).not.toBeDisabled()

        userEvent.click(confirmButton)
        expect(onConfirm).toBeCalledTimes(1)
    })
})

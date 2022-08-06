import userEvent from '@testing-library/user-event'

import { CompanionIncomeInput } from '../../../../components/Root/IncomeHeader/CompanionIncomeInput'
import { NumberInput } from '../../../../components'
import { OtherCriteriaModal } from '../../../../components/common/OtherCriteriaModal'
import { renderWithContext, screen } from '../../../../utils/test'
import { SeverelyDisabledSwitch } from '../../../../components/Root/IncomeHeader/SeverelyDisabledSwitch'

const setup = ({ onClose = jest.fn(), onConfirm = jest.fn() } = {}) => {
    const childrenAboveFifteen = 0
    const childrenAboveSix = 0
    const childrenBelowSix = 0
    const setChildrenAboveFifteen = jest.fn()
    const setChildrenAboveSix = jest.fn()
    const setChildrenBelowSix = jest.fn()

    renderWithContext(
        <OtherCriteriaModal
            isOpen={true}
            steps={5}
            onClose={onClose}
            onConfirm={onConfirm}
            renderSteps={(param: number) => {
                switch (param) {
                    case 1:
                        return <CompanionIncomeInput />
                    case 2:
                        return (
                            <NumberInput
                                label="Počet detí pod 6 rokov (vrátane)"
                                value={childrenBelowSix}
                                setValue={setChildrenBelowSix}
                            />
                        )
                    case 3:
                        return (
                            <NumberInput
                                label="Počet detí vo veku od 6 do 15 rokov"
                                value={childrenAboveSix}
                                setValue={setChildrenAboveSix}
                            />
                        )
                    case 4:
                        return (
                            <NumberInput
                                label="Počet detí nad 15 rokov"
                                value={childrenAboveFifteen}
                                setValue={setChildrenAboveFifteen}
                            />
                        )
                    case 5:
                        return <SeverelyDisabledSwitch />
                    default:
                        return <div />
                }
            }}
        />,
        {
            childrenAboveFifteen,
            childrenAboveSix,
            childrenBelowSix,
            setChildrenAboveFifteen,
            setChildrenAboveSix,
            setChildrenBelowSix,
        }
    )
}

describe('OtherCriteriaModal', () => {
    test('renders modal', () => {
        setup()

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
        setup({ onClose })

        const closeButton = screen.getByRole('button', { name: 'Close' })
        userEvent.click(closeButton)
        expect(onClose).toBeCalledTimes(1)
    })

    test('renders next steps', () => {
        setup()

        expect(
            screen.getByText('Nezdaniteľná časť na manželku/manžela')
        ).toBeInTheDocument()
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
        expect(
            screen.getByText('Počet detí vo veku od 6 do 15 rokov')
        ).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()

        userEvent.click(nextButton)
        expect(screen.getByText('Počet detí nad 15 rokov')).toBeInTheDocument()
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
        setup({ onConfirm })

        const nextButton = screen.getByRole('button', { name: 'Ďalej' })
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).not.toBeDisabled()

        userEvent.click(nextButton)
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

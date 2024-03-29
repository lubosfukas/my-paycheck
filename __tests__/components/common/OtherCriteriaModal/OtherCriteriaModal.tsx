import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import {
    CompanionIncomeInput,
    NumberInput,
    OtherCriteriaModal,
    SeverelyDisabledSwitch,
} from '../../../../components'

const setup = ({ onClose = jest.fn(), onConfirm = jest.fn() } = {}) => {
    render(
        <OtherCriteriaModal
            isOpen={true}
            steps={5}
            onClose={onClose}
            onConfirm={onConfirm}
            renderSteps={(param: number) => {
                switch (param) {
                    case 1:
                        return (
                            <CompanionIncomeInput
                                value={undefined}
                                onChange={jest.fn()}
                            />
                        )
                    case 2:
                        return (
                            <NumberInput
                                label="Počet detí pod 6 rokov (vrátane)"
                                value={0}
                                setValue={jest.fn()}
                            />
                        )
                    case 3:
                        return (
                            <NumberInput
                                label="Počet detí vo veku od 6 do 15 rokov"
                                value={0}
                                setValue={jest.fn()}
                            />
                        )
                    case 4:
                        return (
                            <NumberInput
                                label="Počet detí nad 15 rokov"
                                value={0}
                                setValue={jest.fn()}
                            />
                        )
                    case 5:
                        return (
                            <SeverelyDisabledSwitch
                                value={false}
                                onChange={jest.fn()}
                            />
                        )
                    default:
                        return <div />
                }
            }}
        />
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

    test('calls onClose', async () => {
        const onClose = jest.fn()
        setup({ onClose })

        const closeButton = screen.getByRole('button', { name: 'Close' })
        await userEvent.click(closeButton)
        expect(onClose).toBeCalledTimes(1)
    })

    test('renders next steps', async () => {
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

        await userEvent.click(nextButton)
        expect(previousButton).not.toBeDisabled()
        expect(
            screen.getByText('Počet detí pod 6 rokov (vrátane)')
        ).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()

        await userEvent.click(nextButton)
        expect(
            screen.getByText('Počet detí vo veku od 6 do 15 rokov')
        ).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()

        await userEvent.click(nextButton)
        expect(screen.getByText('Počet detí nad 15 rokov')).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()

        await userEvent.click(nextButton)
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

    test('calls onConfirm', async () => {
        const onConfirm = jest.fn()
        setup({ onConfirm })

        const nextButton = screen.getByRole('button', { name: 'Ďalej' })
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).not.toBeDisabled()

        await userEvent.click(nextButton)
        await userEvent.click(nextButton)
        await userEvent.click(nextButton)
        await userEvent.click(nextButton)

        const confirmButton = screen.getByRole('button', { name: 'Vypočítať' })
        expect(confirmButton).toBeInTheDocument()
        expect(confirmButton).not.toBeDisabled()

        await userEvent.click(confirmButton)
        expect(onConfirm).toBeCalledTimes(1)
    })
})

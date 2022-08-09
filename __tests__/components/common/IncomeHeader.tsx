import { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Button, useDisclosure } from '@chakra-ui/react'

import {
    CompanionIncomeInput,
    IncomeHeader,
    IncomeInput,
    NumberInput,
    OtherCriteriaModal,
    SeverelyDisabledSwitch,
} from '../../../components'
import { device } from '../../../utils/device'
import { RefType } from '../../../types'
import { useMediaQuery } from '../../../hooks'

const setup = ({
    childrenAboveFifteen = 0,
    childrenAboveSix = 0,
    childrenBelowSix = 0,
    companionIncome = undefined,
    isSeverelyDisabled = false,
    monthlyGrossIncome = 0,
    onConfirm = jest.fn(),
    setChildrenAboveFifteen = jest.fn(),
    setChildrenAboveSix = jest.fn(),
    setChildrenBelowSix = jest.fn(),
    setCompanionIncome = jest.fn(),
    setIsSeverelyDisabled = jest.fn(),
    setMonthlyGrossIncome = jest.fn(),
} = {}) => {
    const {
        result: { current: ref },
    } = renderHook(() => useRef<RefType>(null))
    const disclosure = renderHook(() => useDisclosure())
    const {
        result: { current: isLargerThanTablet },
    } = renderHook(() => useMediaQuery(device.tablet))

    render(
        <IncomeHeader
            actions={
                <>
                    <IncomeInput
                        placeholder="Zadajte hrubý mesačný príjem (min. 700€)"
                        value={monthlyGrossIncome}
                        onChange={setMonthlyGrossIncome}
                    />
                    <Button
                        disabled={monthlyGrossIncome < 700}
                        ml={isLargerThanTablet ? 4 : 0}
                        mt={isLargerThanTablet ? 0 : 4}
                        mb={isLargerThanTablet ? 0 : 4}
                        onClick={onConfirm}
                        px={8}
                    >
                        Vypočítať
                    </Button>
                    <Button
                        disabled={monthlyGrossIncome < 700}
                        ml={isLargerThanTablet ? 4 : 0}
                        onClick={disclosure.result.current.onOpen}
                        variant="outline"
                        px={8}
                    >
                        Rozšírené zadanie
                    </Button>
                </>
            }
            description="Tento nástroj vypočítava sumu, ktorú by ste mali
                fakturovať, ak prechádzate na živnosť z TPP tak, aby sa
                náklady zamestnávateľa nezvýšili."
            modal={
                <OtherCriteriaModal
                    ref={ref}
                    isOpen={disclosure.result.current.isOpen}
                    steps={5}
                    onClose={disclosure.result.current.onClose}
                    onConfirm={onConfirm}
                    renderSteps={(param: number) => {
                        switch (param) {
                            case 1:
                                return (
                                    <CompanionIncomeInput
                                        value={companionIncome}
                                        onChange={setCompanionIncome}
                                    />
                                )
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
                                return (
                                    <SeverelyDisabledSwitch
                                        value={isSeverelyDisabled}
                                        onChange={setIsSeverelyDisabled}
                                    />
                                )
                            default:
                                return <div />
                        }
                    }}
                />
            }
            title="Porovnanie TPP a živnosti"
        />
    )

    return disclosure
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
})

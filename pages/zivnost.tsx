import { useCallback, useRef, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'

import { device } from '../utils/device'
import {
    CompanionIncomeInput,
    IncomeHeader,
    IncomeInput,
    Navigation,
    NumberInput,
    OtherCriteriaModal,
    SeverelyDisabledSwitch,
} from '../components'
import { Income, RefType } from '../types'
import { useMediaQuery } from '../hooks'

const Contract = () => {
    const [childrenAboveFifteen, setChildrenAboveFifteen] =
        useState<Income['childrenAboveFifteen']>(0)
    const [childrenAboveSix, setChildrenAboveSix] =
        useState<Income['childrenAboveSix']>(0)
    const [childrenBelowSix, setChildrenBelowSix] =
        useState<Income['childrenBelowSix']>(0)
    const [companionIncome, setCompanionIncome] =
        useState<Income['companionIncome']>()
    const [isSeverelyDisabled, setIsSeverelyDisabled] =
        useState<Income['isSeverelyDisabled']>(false)
    const [monthlyGrossIncome, setMonthlyGrossIncome] =
        useState<Income['monthlyGrossIncome']>(0)
    const [monthsWorked, setMonthsWorked] = useState<Income['monthsWorked']>(12)

    const ref = useRef<RefType>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const isLargerThanTablet = useMediaQuery(device.tablet)

    const scrollTo = useCallback(() => {
        if (ref && ref.current)
            ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [ref])

    const onConfirm = () => {
        scrollTo()
    }

    return (
        <>
            <Navigation />
            <IncomeHeader
                actions={
                    <>
                        <IncomeInput
                            placeholder="Zadajte mesačný príjem na faktúru"
                            value={monthlyGrossIncome}
                            onChange={setMonthlyGrossIncome}
                        />
                        <Button
                            disabled={!monthlyGrossIncome}
                            ml={isLargerThanTablet ? 4 : 0}
                            mt={isLargerThanTablet ? 0 : 4}
                            mb={isLargerThanTablet ? 0 : 4}
                            onClick={onConfirm}
                            px={8}
                        >
                            Vypočítať
                        </Button>
                        <Button
                            disabled={!monthlyGrossIncome}
                            ml={isLargerThanTablet ? 4 : 0}
                            onClick={onOpen}
                            variant="outline"
                            px={8}
                        >
                            Rozšírené zadanie
                        </Button>
                    </>
                }
                description="Tento nástroj vypočítava čistý príjem zo živnosti počas prvého roku aj nasledujúcich rokov."
                modal={
                    <OtherCriteriaModal
                        ref={ref}
                        isOpen={isOpen}
                        steps={6}
                        onClose={onClose}
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
                                case 6:
                                    return (
                                        <NumberInput
                                            label="Počet odpracovaných mesiacov"
                                            max={12}
                                            min={1}
                                            value={monthsWorked}
                                            setValue={setMonthsWorked}
                                        />
                                    )
                                default:
                                    return <div />
                            }
                        }}
                    />
                }
                title="Živnosť"
            />
        </>
    )
}

export default Contract

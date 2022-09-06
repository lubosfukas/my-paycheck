import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'

import { device } from '../utils/device'
import {
    CompanionIncomeInput,
    FirstYearCard,
    IncomeHeader,
    IncomeInput,
    ManDayCard,
    Navigation,
    NextYearCard,
    NumberInput,
    OtherCriteriaModal,
    SeverelyDisabledSwitch,
} from '../components'
import { ContractIncome, RefType } from '../types'
import { useCalculateContractNetIncome, useMediaQuery } from '../hooks'

const Contract = () => {
    const [childrenAboveFifteen, setChildrenAboveFifteen] =
        useState<ContractIncome['childrenAboveFifteen']>(0)
    const [childrenAboveSix, setChildrenAboveSix] =
        useState<ContractIncome['childrenAboveSix']>(0)
    const [childrenBelowSix, setChildrenBelowSix] =
        useState<ContractIncome['childrenBelowSix']>(0)
    const [companionIncome, setCompanionIncome] =
        useState<ContractIncome['companionIncome']>()
    const [isSeverelyDisabled, setIsSeverelyDisabled] =
        useState<ContractIncome['isSeverelyDisabled']>(false)
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [monthsWorked, setMonthsWorked] =
        useState<ContractIncome['monthsWorked']>(12)

    useEffect(() => {
        document.title = 'Živnosť'
    })

    const ref = useRef<RefType>(null)
    const scrollTo = useCallback(() => {
        if (ref && ref.current)
            ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [ref])

    const { isOpen, onOpen, onClose } = useDisclosure()

    const numMonthlyIncome = parseFloat(monthlyIncome)
    const buttonDisabled = numMonthlyIncome ? numMonthlyIncome < 1000 : true

    const {
        annualIncome,
        annualNetIncome,
        contributions,
        firstYearAnnualNetIncome,
        firstYearContributions,
        firstYearNetIncome,
        manDayRate,
        manHourRate,
        netIncome,
        calculate,
    } = useCalculateContractNetIncome({
        companionIncome,
        childrenAboveFifteen,
        childrenAboveSix,
        childrenBelowSix,
        isSeverelyDisabled,
        monthsWorked,
        monthlyIncome: numMonthlyIncome,
    })

    const isLargerThanTablet = useMediaQuery(device.tablet)

    const onConfirm = () => {
        calculate()
        scrollTo()
    }

    return (
        <>
            <Navigation />
            <IncomeHeader
                actions={
                    <>
                        <IncomeInput
                            invalid={numMonthlyIncome < 1000}
                            placeholder="Zadajte mesačný príjem na faktúru (min. 1000€)"
                            value={monthlyIncome}
                            onChange={setMonthlyIncome}
                        />
                        <Button
                            disabled={buttonDisabled}
                            ml={isLargerThanTablet ? 4 : 0}
                            mt={isLargerThanTablet ? 0 : 4}
                            mb={isLargerThanTablet ? 0 : 4}
                            onClick={onConfirm}
                            px={8}
                        >
                            Vypočítať
                        </Button>
                        <Button
                            disabled={buttonDisabled}
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
                                            step={0.5}
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
            <main>
                <ManDayCard
                    ref={ref}
                    annualIncome={annualIncome}
                    manDayRate={manDayRate}
                    manHourRate={manHourRate}
                />
                <FirstYearCard
                    annualNetIncome={firstYearAnnualNetIncome}
                    contributions={firstYearContributions}
                    monthlyNetIncome={firstYearNetIncome}
                    monthsWorked={monthsWorked}
                />
                <NextYearCard
                    annualNetIncome={annualNetIncome}
                    contributions={contributions}
                    monthlyNetIncome={netIncome}
                    monthsWorked={monthsWorked}
                />
            </main>
        </>
    )
}

export default Contract

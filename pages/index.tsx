import { useCallback, useRef, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'

import {
    ContractCard,
    CompanionIncomeInput,
    EmploymentCard,
    FirstYearContractCard,
    IncomeInput,
    IncomeHeader,
    ManDayCard,
    Navigation,
    NumberInput,
    OtherCriteriaModal,
    SeverelyDisabledSwitch,
} from '../components'
import { useCalculate, useMediaQuery } from '../hooks'
import { EmploymentIncome, RefType } from '../types'
import { device } from '../utils/device'

const Home: NextPage = () => {
    const [childrenAboveFifteen, setChildrenAboveFifteen] =
        useState<EmploymentIncome['childrenAboveFifteen']>(0)
    const [childrenAboveSix, setChildrenAboveSix] =
        useState<EmploymentIncome['childrenAboveSix']>(0)
    const [childrenBelowSix, setChildrenBelowSix] =
        useState<EmploymentIncome['childrenBelowSix']>(0)
    const [companionIncome, setCompanionIncome] =
        useState<EmploymentIncome['companionIncome']>()
    const [isSeverelyDisabled, setIsSeverelyDisabled] =
        useState<EmploymentIncome['isSeverelyDisabled']>(false)
    const [monthlyGrossIncome, setMonthlyGrossIncome] =
        useState<EmploymentIncome['monthlyGrossIncome']>(0)

    const ref = useRef<RefType>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        employeeContributions,
        monthlyNetIncome,
        annualSuperGrossIncome,
        employerContributions,
        contractContributions,
        contractIncome,
        laborCost,
        contractManDayRate,
        firstYearContractContributions,
        firstYearContractIncome,
        calculate,
    } = useCalculate({
        childrenAboveSix,
        childrenBelowSix,
        childrenAboveFifteen,
        companionIncome,
        isSeverelyDisabled,
        monthlyGrossIncome,
        monthsWorked: 12,
    })

    const isLargerThanTablet = useMediaQuery(device.tablet)

    const scrollTo = useCallback(() => {
        if (ref && ref.current)
            ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [ref])

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
                            onClick={onOpen}
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
                        isOpen={isOpen}
                        steps={5}
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
                                default:
                                    return <div />
                            }
                        }}
                    />
                }
                title="Porovnanie TPP a živnosti"
            />
            <main>
                <EmploymentCard
                    ref={ref}
                    annualSuperGrossIncome={annualSuperGrossIncome}
                    employeeContributions={employeeContributions}
                    employerContributions={employerContributions}
                    monthlyNetIncome={monthlyNetIncome}
                />
                <ManDayCard
                    laborCost={laborCost}
                    manDayRate={contractManDayRate}
                />
                <FirstYearContractCard
                    annualLaborCost={annualSuperGrossIncome}
                    averageNetIncome={firstYearContractIncome}
                    contributions={firstYearContractContributions}
                />
                <ContractCard
                    annualLaborCost={annualSuperGrossIncome}
                    averageNetIncome={contractIncome}
                    contributions={contractContributions}
                />
            </main>
        </>
    )
}

export default Home

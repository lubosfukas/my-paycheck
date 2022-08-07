import { useCallback, useRef, useState } from 'react'
import type { NextPage } from 'next'

import {
    ContractCard,
    EmploymentCard,
    FirstYearContractCard,
    IncomeHeader,
    ManDayCard,
    Navigation,
} from '../components'
import { useCalculate } from '../hooks'
import { Income, RefType } from '../types'

const Home: NextPage = () => {
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

    const ref = useRef<RefType>(undefined)

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
        monthsWorked,
    })

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
                ref={ref}
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
            <main>
                <EmploymentCard
                    annualSuperGrossIncome={annualSuperGrossIncome}
                    employeeContributions={employeeContributions}
                    employerContributions={employerContributions}
                    monthlyNetIncome={monthlyNetIncome}
                    ref={ref}
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

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
import {
    childrenAboveSix as defaultChildrenAboveSix,
    childrenBelowSix as defaultChildrenBelowSix,
    childrenAboveFifteen as defaultChildrenAboveFifteen,
    isSeverelyDisabled as defaultIsSeverelyDisabled,
    monthsWorked as defaultMonthsWorked,
} from '../utils/defaults'
import { RefType } from '../types'

const Home: NextPage = () => {
    const [childrenAboveSix, setChildrenAboveSix] = useState(
        defaultChildrenAboveSix
    )
    const [childrenBelowSix, setChildrenBelowSix] = useState(
        defaultChildrenBelowSix
    )
    const [childrenAboveFifteen, setChildrenAboveFifteen] = useState(
        defaultChildrenAboveFifteen
    )
    const [companionIncome, setCompanionIncome] = useState<number | undefined>()
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(
        defaultIsSeverelyDisabled
    )
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(defaultMonthsWorked)

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

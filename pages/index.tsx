import { useCallback, useMemo, useRef, useState } from 'react'
import type { NextPage } from 'next'

import {
    EmploymentCard,
    IncomeHeader,
    ManDayCard,
    FirstYearContractCard,
    ContractCard,
} from '../components'
import { useCalculate } from '../hooks'
import { IncomeContext } from '../IncomeContext'
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

    const value = useMemo(
        () => ({
            childrenAboveSix,
            setChildrenAboveSix,
            childrenBelowSix,
            setChildrenBelowSix,
            childrenAboveFifteen,
            setChildrenAboveFifteen,
            isSeverelyDisabled,
            setIsSeverelyDisabled,
            monthlyGrossIncome,
            setMonthlyGrossIncome,
            monthsWorked,
            setMonthsWorked,
            companionIncome,
            setCompanionIncome,
        }),
        [
            childrenAboveSix,
            childrenBelowSix,
            childrenAboveFifteen,
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
            companionIncome,
        ]
    )

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
        <IncomeContext.Provider value={value}>
            <header>
                <IncomeHeader ref={ref} onConfirm={onConfirm} />
            </header>
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
        </IncomeContext.Provider>
    )
}

export default Home

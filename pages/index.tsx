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
import { RefType } from '../types'

const Home: NextPage = () => {
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [companionIncome, setCompanionIncome] = useState<number | undefined>()
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)

    const ref = useRef<RefType>(undefined)

    const value = useMemo(
        () => ({
            childrenAboveSix,
            setChildrenAboveSix,
            childrenBelowSix,
            setChildrenBelowSix,
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
        contractAverageIncome,
        contractContributions,
        contractIncome,
        laborCost,
        contractManDayRate,
        firstYearContractAverageIncome,
        firstYearContractContributions,
        firstYearContractIncome,
        calculate,
    } = useCalculate({
        childrenAboveSix,
        childrenBelowSix,
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
                    averageNetIncome={firstYearContractAverageIncome}
                    contributions={firstYearContractContributions}
                    netIncome={firstYearContractIncome}
                />
                <ContractCard
                    averageNetIncome={contractAverageIncome}
                    contributions={contractContributions}
                    netIncome={contractIncome}
                />
            </main>
        </IncomeContext.Provider>
    )
}

export default Home

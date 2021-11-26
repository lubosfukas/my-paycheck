import { useCallback, useRef, useState } from 'react'
import type { NextPage } from 'next'

import {
    EmploymentCard,
    IncomeHeader,
    ManDayCard,
    FirstYearContractCard,
    ContractCard,
} from '../components'
import {
    useCalcContractNetIncome,
    useCalcNetIncome,
    useCalcSuperGrossIncome,
} from '../hooks'
import {
    DEFAULT_CHILDREN_ABOVE_SIX,
    DEFAULT_CHILDREN_BELOW_SIX,
    DEFAULT_COMPANION_INCOME,
    DEFAULT_SEVERELY_DISABLED,
} from '../utils/defaults'
import { CompanionIncome, RefType } from '../types'

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(
        DEFAULT_SEVERELY_DISABLED
    )
    const [childrenBelowSix, setChildrenBelowSix] = useState(
        DEFAULT_CHILDREN_BELOW_SIX
    )
    const [childrenAboveSix, setChildrenAboveSix] = useState(
        DEFAULT_CHILDREN_ABOVE_SIX
    )
    const [companionIncome, setCompanionIncome] = useState<CompanionIncome>(
        DEFAULT_COMPANION_INCOME
    )
    const ref = useRef<RefType>(undefined)

    const {
        annualIncome: annualNetIncome,
        monthlyIncome: monthlyNetIncome,
        contributions: employeeContributions,
    } = useCalcNetIncome({
        monthlyGrossIncome,
        monthsWorked,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
        companionIncome: companionIncome.income,
    })

    const {
        annualIncome: annualSuperGrossIncome,
        monthlyIncome: monthlySuperGrossIncome,
        contributions: employerContributions,
    } = useCalcSuperGrossIncome({ monthlyGrossIncome, isSeverelyDisabled })

    const {
        averageIncome: averageNetIncome,
        firstYearAverageIncome: firstYearAverageNetIncome,
        firstYearIncome: firstYearNetIncome,
        income: netIncome,
        manDayRate,
        manHourRate,
        contributions,
        firstYearContributions,
    } = useCalcContractNetIncome({
        monthlyIncome: monthlySuperGrossIncome,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
        companionIncome: companionIncome.income,
    })

    const scrollTo = useCallback(() => {
        if (ref && ref.current)
            ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [ref])

    const onConfirm = ({
        monthlyGrossIncome,
        monthsWorked,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
        companionIncome,
    }: {
        monthlyGrossIncome: number
        monthsWorked: number
        isSeverelyDisabled: boolean
        childrenBelowSix: number
        childrenAboveSix: number
        companionIncome: CompanionIncome
    }) => {
        setMonthlyGrossIncome(monthlyGrossIncome)
        setIsSeverelyDisabled(isSeverelyDisabled)
        setChildrenBelowSix(childrenBelowSix)
        setChildrenAboveSix(childrenAboveSix)
        setMonthsWorked(monthsWorked)
        setCompanionIncome(companionIncome)
        scrollTo()
    }

    return (
        <>
            <header>
                <IncomeHeader ref={ref} onConfirm={onConfirm} />
            </header>
            <main>
                <EmploymentCard
                    ref={ref}
                    monthlyNetIncome={monthlyNetIncome}
                    annualNetIncome={annualNetIncome}
                    monthlySuperGrossIncome={monthlySuperGrossIncome}
                    annualSuperGrossIncome={annualSuperGrossIncome}
                    employeeContributions={employeeContributions}
                    employerContributions={employerContributions}
                />
                <ManDayCard
                    laborCost={monthlySuperGrossIncome}
                    manDayRate={manDayRate}
                    manHourRate={manHourRate}
                />
                <FirstYearContractCard
                    averageNetIncome={firstYearAverageNetIncome}
                    contributions={firstYearContributions}
                    netIncome={firstYearNetIncome}
                />
                <ContractCard
                    averageNetIncome={averageNetIncome}
                    contributions={contributions}
                    netIncome={netIncome}
                />
            </main>
        </>
    )
}

export default Home

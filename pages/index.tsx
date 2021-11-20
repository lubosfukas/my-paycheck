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
import { RefType } from '../types'

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [companionIncome, setCompanionIncome] = useState<number | undefined>()
    const ref = useRef<RefType>(null)

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
        companionIncome,
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
        companionIncome,
    })

    const scrollTo = useCallback(() => {
        console.log('scroll')
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
        companionIncome?: number
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
                <IncomeHeader onConfirm={onConfirm} />
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

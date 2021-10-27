import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeHeader } from '../components'
import {
    useCalcContractNetIncome,
    useCalculateNetIncome,
    useCalculateSuperGrossIncome,
} from '../hooks'

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(0)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [companionIncome, setCompanionIncome] = useState<number | undefined>()

    const { monthlyNetIncome, annualNetIncome, employeeContributions } =
        useCalculateNetIncome({
            monthlyGrossIncome,
            monthsWorked,
            isSeverelyDisabled,
            childrenBelowSix,
            childrenAboveSix,
            companionIncome,
        })
    const {
        annualSuperGrossIncome,
        monthlySuperGrossIncome,
        employerContributions,
    } = useCalculateSuperGrossIncome({ monthlyGrossIncome, isSeverelyDisabled })

    const { netIncome } = useCalcContractNetIncome({
        monthlyIncome: monthlySuperGrossIncome,
        monthsWorked,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
        companionIncome,
    })
    console.log('net income', netIncome)

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
    }

    return (
        <>
            <header>
                <IncomeHeader onConfirm={onConfirm} />
            </header>
            <main>
                <EmploymentCard
                    monthlyNetIncome={monthlyNetIncome}
                    annualNetIncome={annualNetIncome}
                    monthlySuperGrossIncome={monthlySuperGrossIncome}
                    annualSuperGrossIncome={annualSuperGrossIncome}
                    isSeverelyDisabled={isSeverelyDisabled}
                    monthsWorked={monthsWorked}
                    employeeContributions={employeeContributions}
                    employerContributions={employerContributions}
                />
            </main>
        </>
    )
}

export default Home

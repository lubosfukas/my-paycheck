import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeInputHeader } from '../components'
import { useCalculateNetIncome } from '../hooks'
import { useCalculateSuperGrossIncome } from '../hooks/useCalculateSuperGrossIncome'
import { monthsWorked as defaultMonthsWorked } from '../utils/defaults'

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(0)

    const { monthlyNetIncome, annualNetIncome, employeeContributions } =
        useCalculateNetIncome(
            monthlyGrossIncome,
            monthsWorked,
            isSeverelyDisabled,
            childrenBelowSix,
            childrenAboveSix
        )
    const {
        annualSuperGrossIncome,
        monthlySuperGrossIncome,
        employerContributions,
    } = useCalculateSuperGrossIncome(monthlyGrossIncome, isSeverelyDisabled)

    const onConfirm = ({
        monthlyGrossIncome,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
    }: {
        monthlyGrossIncome: number
        isSeverelyDisabled: boolean
        childrenBelowSix: number
        childrenAboveSix: number
    }) => {
        setMonthlyGrossIncome(monthlyGrossIncome)
        setIsSeverelyDisabled(isSeverelyDisabled)
        setChildrenBelowSix(childrenBelowSix)
        setChildrenAboveSix(childrenAboveSix)
        setMonthsWorked(defaultMonthsWorked)
    }

    return (
        <>
            <header data-testid="header">
                <IncomeInputHeader onConfirm={onConfirm} />
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

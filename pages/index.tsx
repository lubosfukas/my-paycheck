import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeInputHeader } from '../components'
import { useCalculateNetIncome } from '../hooks'
import { monthsWorked as defaultMonthsWorked } from '../utils/defaults'
import { useCalculateSuperGrossIncome } from '../hooks/useCalculateSuperGrossIncome'

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

    const onChange = ({
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
                <IncomeInputHeader onChange={onChange} />
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

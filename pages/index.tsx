import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeInput } from '../components'
import { useCalculateNetIncome } from '../hooks'
import { monthsWorked as defaultMonthsWorked } from '../utils/defaults'
import { useCalculateSuperGrossIncome } from '../hooks/useCalculateSuperGrossIncome'

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [monthsWorked, setMonthsWorked] = useState(0)

    const { monthlyNetIncome, annualNetIncome, employeeContributions } =
        useCalculateNetIncome(
            monthlyGrossIncome,
            monthsWorked,
            isSeverelyDisabled
        )
    const {
        annualSuperGrossIncome,
        monthlySuperGrossIncome,
        employerContributions,
    } = useCalculateSuperGrossIncome(monthlyGrossIncome, isSeverelyDisabled)

    const onChange = (income: string, isSeverelyDisabled: boolean) => {
        const numIncome = parseInt(income)
        if (isNaN(numIncome)) return

        setMonthlyGrossIncome(numIncome)
        setIsSeverelyDisabled(isSeverelyDisabled)
        setMonthsWorked(defaultMonthsWorked)
    }

    return (
        <>
            <header data-testid="header">
                <IncomeInput
                    onChange={(income: string, isSeverelyDisabled) =>
                        onChange(income, isSeverelyDisabled)
                    }
                />
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

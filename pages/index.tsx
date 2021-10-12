import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeInput } from '../components'
import { useCalculateNetIncome } from '../hooks'
import { monthsWorked as defaultMonthsWorked } from '../utils/defaults'
import { useCalculateSuperGrossIncome } from '../hooks/useCalculateSuperGrossIncome'

const isSeverelyDisabled = false

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
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

    const onChange = (newValue: string) => {
        const numValue = parseInt(newValue)
        if (isNaN(numValue)) return

        setMonthlyGrossIncome(numValue)
        setMonthsWorked(defaultMonthsWorked)
    }

    return (
        <>
            <header data-testid="header">
                <IncomeInput
                    onChange={(newValue: string) => onChange(newValue)}
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

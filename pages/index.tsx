import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeInput } from '../components'
import { useCalculateNetIncome } from '../hooks'
import { monthsWorked as defaultMonthsWorked } from '../utils/defaults'

const isSeverelyDisabled = false

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(0)

    const {
        annualNetIncome,
        netMonthlyIncome,
        healthInsurance,
        socialInsurance,
        medicareInsurance,
        retirementInsurance,
        disabilityInsurance,
        unemploymentInsurance,
        incomeTax,
    } = useCalculateNetIncome(
        monthlyGrossIncome,
        monthsWorked,
        isSeverelyDisabled
    )

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
                    monthlyNetIncome={netMonthlyIncome}
                    monthsWorked={monthsWorked}
                    annualNetIncome={annualNetIncome}
                    healthInsurance={healthInsurance}
                    socialInsurance={socialInsurance}
                    medicareInsurance={medicareInsurance}
                    retirementInsurance={retirementInsurance}
                    disabilityInsurance={disabilityInsurance}
                    unemploymentInsurance={unemploymentInsurance}
                    incomeTax={incomeTax}
                />
            </main>
        </>
    )
}

export default Home

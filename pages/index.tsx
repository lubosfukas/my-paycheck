import { useState } from 'react'
import type { NextPage } from 'next'

import { EmploymentCard, IncomeInput } from '../components'

const Home: NextPage = () => {
    const [income, setIncome] = useState<string>('')

    return (
        <>
            <header data-testid="header">
                <IncomeInput
                    onChange={(newValue: string) => setIncome(newValue)}
                    value={income}
                />
            </header>
            <main>
                <EmploymentCard
                    netMonthlyIncome={0}
                    monthsWorked={0}
                    grossAnnualSalary={0}
                />
            </main>
        </>
    )
}

export default Home

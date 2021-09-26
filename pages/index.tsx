import { useState } from 'react'
import type { NextPage } from 'next'

import { IncomeInput } from '../components'

const Home: NextPage = () => {
    const [income, setIncome] = useState<string>('')
    return (
        <header>
            <IncomeInput
                onChange={(newValue: string) => setIncome(newValue)}
                value={income}
            />
        </header>
    )
}

export default Home

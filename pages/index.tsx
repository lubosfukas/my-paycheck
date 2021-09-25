import { useState } from 'react'
import type { NextPage } from 'next'
import { IncomeInput } from '../components'

const Home: NextPage = () => {
    const [income, setIncome] = useState<number>()
    return (
        <IncomeInput
            onChange={(newValue: number) => setIncome(newValue)}
            value={income}
        />
    )
}

export default Home

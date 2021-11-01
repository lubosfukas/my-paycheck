import { useState } from 'react'
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
    useCalculateNetIncome,
    useCalculateSuperGrossIncome,
} from '../hooks'

const Home: NextPage = () => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)
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

    const {
        averageNetIncome,
        netIncome,
        firstYearAverageNetIncome,
        firstYearNetIncome,
        manDayRate,
        manHourRate,
        contributions,
    } = useCalcContractNetIncome({
        monthlyIncome: monthlySuperGrossIncome,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
        companionIncome,
    })

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
                    isSeverelyDisabled={isSeverelyDisabled}
                    contributions={(({ healthInsurance, incomeTax }) => ({
                        healthInsurance,
                        incomeTax,
                    }))(contributions)}
                    netIncome={firstYearNetIncome}
                />
                <ContractCard
                    averageNetIncome={averageNetIncome}
                    contributions={contributions}
                    isSeverelyDisabled={isSeverelyDisabled}
                    netIncome={netIncome}
                />
            </main>
        </>
    )
}

export default Home

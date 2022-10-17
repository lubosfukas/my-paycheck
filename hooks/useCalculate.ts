import { useCallback, useState } from 'react'

import {
    calcContractNetIncome,
    calcNetIncome,
    calcSuperGrossIncome,
} from '../utils/helpers'
import { Contributions, EmploymentIncome } from '../types'
import {
    defaultContractContributions,
    defaultEmployeeContributions,
    defaultEmployerContributions,
    defaultFirstYearContractContributions,
} from '../utils/defaults'

export const useCalculate = ({
    companionIncome,
    childrenAboveSix,
    childrenBelowSix,
    childrenAboveFifteen,
    isSeverelyDisabled,
    monthlyGrossIncome,
    monthsWorked,
}: EmploymentIncome) => {
    const [annualNetIncome, setAnnualNetIncome] = useState<number>(0)
    const [employeeContributions, setEmployeeContributions] =
        useState<Contributions>(defaultEmployeeContributions)
    const [monthlyNetIncome, setMonthlyNetIncome] = useState<number>(0)

    const [annualSuperGrossIncome, setAnnualSuperGrossIncome] = useState(0)
    const [employerContributions, setEmployerContributions] =
        useState<Contributions>(defaultEmployerContributions)
    const [monthlySuperGrossIncome, setMonthlySuperGrossIncome] = useState(0)

    const [contractContributions, setContractContributions] =
        useState<Contributions>(defaultContractContributions)
    const [contractIncome, setContractIncome] = useState(0)
    const [contractAnnualIncome, setContractAnnualIncome] = useState(0)

    const [contractManDayRate, setContractManDayRate] = useState(0)
    const [contractManHourRate, setContractManHourRate] = useState(0)
    const [laborCost, setLaborCost] = useState(0)

    const [firstYearContractContributions, setFirstYearContractContributions] =
        useState<Contributions>(defaultFirstYearContractContributions)
    const [firstYearContractIncome, setFirstYearContractIncome] = useState(0)
    const [firstYearContractAnnualIncome, setFirstYearContractAnnualIncome] =
        useState(0)

    const calculateCallback = useCallback(() => {
        const netIncome = calcNetIncome({
            childrenAboveSix,
            childrenBelowSix,
            childrenAboveFifteen,
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
            companionIncome,
        })

        const superGrossIncome = calcSuperGrossIncome({
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
        })

        const contractIncome = calcContractNetIncome({
            childrenAboveSix,
            childrenBelowSix,
            childrenAboveFifteen,
            isSeverelyDisabled,
            companionIncome,
            annualIncome: superGrossIncome.annualIncome,
            monthsWorked,
        })

        setAnnualNetIncome(netIncome.annualIncome)
        setEmployeeContributions(netIncome.contributions)
        setMonthlyNetIncome(netIncome.monthlyIncome)
        setAnnualSuperGrossIncome(superGrossIncome.annualIncome)
        setEmployerContributions(superGrossIncome.contributions)
        setMonthlySuperGrossIncome(superGrossIncome.monthlyIncome)
        setContractAnnualIncome(contractIncome.annualNetIncome)
        setContractContributions(contractIncome.contributions)
        setFirstYearContractAnnualIncome(
            contractIncome.firstYearAnnualNetIncome
        )
        setFirstYearContractContributions(contractIncome.firstYearContributions)
        setFirstYearContractIncome(contractIncome.firstYearIncome)
        setContractIncome(contractIncome.income)
        setContractManDayRate(contractIncome.manDayRate)
        setContractManHourRate(contractIncome.manHourRate)
        setLaborCost(contractIncome.laborCost)
    }, [
        childrenAboveSix,
        childrenBelowSix,
        companionIncome,
        childrenAboveFifteen,
        isSeverelyDisabled,
        monthlyGrossIncome,
        monthsWorked,
    ])

    return {
        annualNetIncome,
        employeeContributions,
        monthlyNetIncome,

        annualSuperGrossIncome,
        employerContributions,
        monthlySuperGrossIncome,

        contractAnnualIncome,
        contractContributions,
        contractIncome,

        laborCost,
        contractManDayRate,
        contractManHourRate,

        firstYearContractAnnualIncome,
        firstYearContractContributions,
        firstYearContractIncome,

        calculate: calculateCallback,
    }
}

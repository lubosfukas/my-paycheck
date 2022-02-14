import { useCallback, useState } from 'react'
import { Contributions } from '../../types'
import { calculate } from './utils'
import {
    defaultContractContributions,
    defaultEmployeeContributions,
    defaultEmployerContributions,
    defaultFirstYearContractContributions,
} from './utils/defaults'

export const useCalculate = ({
    monthlyGrossIncome,
    companionIncome,
    childrenAboveSix = 0,
    childrenBelowSix = 0,
    isSeverelyDisabled = false,
    monthsWorked = 12,
}: {
    monthlyGrossIncome: number
    childrenAboveSix?: number
    childrenBelowSix?: number
    companionIncome?: number
    isSeverelyDisabled?: boolean
    monthsWorked?: number
}) => {
    const [annualNetIncome, setAnnualNetIncome] = useState<number>(0)
    const [employeeContributions, setEmployeeContributions] =
        useState<Contributions>(defaultEmployeeContributions)
    const [monthlyNetIncome, setMonthlyNetIncome] = useState<number>(0)

    const [annualSuperGrossIncome, setAnnualSuperGrossIncome] = useState(0)
    const [employerContributions, setEmployerContributions] =
        useState<Contributions>(defaultEmployerContributions)
    const [monthlySuperGrossIncome, setMonthlySuperGrossIncome] = useState(0)

    const [contractAverageIncome, setContractAverageIncome] = useState(0)
    const [contractContributions, setContractContributions] =
        useState<Contributions>(defaultContractContributions)
    const [contractIncome, setContractIncome] = useState(0)
    const [contractManDayRate, setContractManDayRate] = useState(0)
    const [contractManHourRate, setContractManHourRate] = useState(0)
    const [firstYearContractAverageIncome, setFirstYearContractAverageIncome] =
        useState(0)
    const [firstYearContractContributions, setFirstYearContractContributions] =
        useState<Contributions>(defaultFirstYearContractContributions)
    const [firstYearContractIncome, setFirstYearContractIncome] = useState(0)

    const calculateCallback = useCallback(() => {
        const {
            annualNetIncome,
            employeeContributions,
            monthlyNetIncome,
            annualSuperGrossIncome,
            employerContributions,
            monthlySuperGrossIncome,
            contractAverageIncome,
            contractContributions,
            contractIncome,
            contractManDayRate,
            contractManHourRate,
            firstYearContractAverageIncome,
            firstYearContractContributions,
            firstYearContractIncome,
        } = calculate({
            childrenAboveSix,
            childrenBelowSix,
            companionIncome,
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
        })

        setAnnualNetIncome(annualNetIncome)
        setEmployeeContributions(employeeContributions)
        setMonthlyNetIncome(monthlyNetIncome)
        setAnnualSuperGrossIncome(annualSuperGrossIncome)
        setEmployerContributions(employerContributions)
        setMonthlySuperGrossIncome(monthlySuperGrossIncome)
        setContractAverageIncome(contractAverageIncome)
        setContractContributions(contractContributions)
        setFirstYearContractAverageIncome(firstYearContractAverageIncome)
        setFirstYearContractContributions(firstYearContractContributions)
        setFirstYearContractIncome(firstYearContractIncome)
        setContractIncome(contractIncome)
        setContractManDayRate(contractManDayRate)
        setContractManHourRate(contractManHourRate)
    }, [
        childrenAboveSix,
        childrenBelowSix,
        companionIncome,
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

        contractAverageIncome,
        contractContributions,
        contractIncome,
        contractManDayRate,
        contractManHourRate,
        firstYearContractAverageIncome,
        firstYearContractContributions,
        firstYearContractIncome,

        calculate: calculateCallback,
    }
}

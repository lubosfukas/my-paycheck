import { useCallback, useState } from 'react'
import { Contributions } from '../../types'
import {
    calcContractNetIncome,
    calcNetIncome,
    calcSuperGrossIncome,
} from './utils'
import {
    defaultContractContributions,
    defaultEmployeeContributions,
    defaultEmployerContributions,
    defaultFirstYearContractContributions,
} from './utils/defaults'
import {
    childrenAboveSix as defaultChildrenAboveSix,
    childrenBelowSix as defaultChildrenBelowSix,
    childrenAboveFifteen as defaultChildrenBelowFifteen,
    isSeverelyDisabled as defaultIsSeverelyDisabled,
    monthsWorked as defaultMonthsWorked,
} from '../../utils/defaults'

export const useCalculate = ({
    monthlyGrossIncome,
    companionIncome,
    childrenAboveSix = defaultChildrenAboveSix,
    childrenBelowSix = defaultChildrenBelowSix,
    childrenAboveFifteen = defaultChildrenBelowFifteen,
    isSeverelyDisabled = defaultIsSeverelyDisabled,
    monthsWorked = defaultMonthsWorked,
}: {
    monthlyGrossIncome: number
    childrenAboveSix?: number
    childrenBelowSix?: number
    childrenAboveFifteen?: number
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

    const [contractContributions, setContractContributions] =
        useState<Contributions>(defaultContractContributions)
    const [contractIncome, setContractIncome] = useState(0)
    const [contractManDayRate, setContractManDayRate] = useState(0)
    const [contractManHourRate, setContractManHourRate] = useState(0)
    const [firstYearContractContributions, setFirstYearContractContributions] =
        useState<Contributions>(defaultFirstYearContractContributions)
    const [firstYearContractIncome, setFirstYearContractIncome] = useState(0)
    const [laborCost, setLaborCost] = useState(0)

    const calculateCallback = useCallback(() => {
        const {
            annualIncome: annualNetIncome,
            contributions: employeeContributions,
            monthlyIncome: monthlyNetIncome,
        } = calcNetIncome({
            childrenAboveSix,
            childrenBelowSix,
            childrenAboveFifteen,
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
            companionIncome,
        })

        const {
            annualIncome: annualSuperGrossIncome,
            contributions: employerContributions,
            monthlyIncome: monthlySuperGrossIncome,
        } = calcSuperGrossIncome({
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
        })

        const {
            laborCost,
            contributions: contractContributions,
            firstYearContributions: firstYearContractContributions,
            firstYearIncome: firstYearContractIncome,
            income: contractIncome,
            manDayRate: contractManDayRate,
            manHourRate: contractManHourRate,
        } = calcContractNetIncome({
            childrenAboveSix,
            childrenBelowSix,
            childrenAboveFifteen,
            isSeverelyDisabled,
            companionIncome,
            annualIncome: annualSuperGrossIncome,
            monthsWorked: 10.5,
        })

        setAnnualNetIncome(annualNetIncome)
        setEmployeeContributions(employeeContributions)
        setMonthlyNetIncome(monthlyNetIncome)
        setAnnualSuperGrossIncome(annualSuperGrossIncome)
        setEmployerContributions(employerContributions)
        setMonthlySuperGrossIncome(monthlySuperGrossIncome)
        setContractContributions(contractContributions)
        setFirstYearContractContributions(firstYearContractContributions)
        setFirstYearContractIncome(firstYearContractIncome)
        setContractIncome(contractIncome)
        setContractManDayRate(contractManDayRate)
        setContractManHourRate(contractManHourRate)
        setLaborCost(laborCost)
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

        contractContributions,
        contractIncome,

        laborCost,
        contractManDayRate,
        contractManHourRate,

        firstYearContractContributions,
        firstYearContractIncome,

        calculate: calculateCallback,
    }
}

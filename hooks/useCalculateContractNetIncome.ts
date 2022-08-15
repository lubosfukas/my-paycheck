import { useCallback, useState } from 'react'

import { calcContractNetIncome, to2Decimal } from '../utils/helpers'
import { Contributions, ContractIncome } from '../types'
import {
    defaultContractContributions,
    defaultFirstYearContractContributions,
} from '../utils/defaults'

export const useCalculateContractNetIncome = ({
    companionIncome,
    childrenAboveSix,
    childrenBelowSix,
    childrenAboveFifteen,
    isSeverelyDisabled,
    monthlyIncome,
    monthsWorked,
}: ContractIncome) => {
    const [annualIncome, setAnnualIncome] = useState(0)
    const [annualNetIncome, setAnnualNetIncome] = useState(0)
    const [contributions, setContributions] = useState<Contributions>(
        defaultContractContributions
    )
    const [firstYearAnnualNetIncome, setFirstYearAnnualNetIncome] = useState(0)
    const [firstYearContributions, setFirstYearContributions] =
        useState<Contributions>(defaultFirstYearContractContributions)
    const [firstYearNetIncome, setFirstYearNetIncome] = useState(0)
    const [manDayRate, setManDayRate] = useState(0)
    const [manHourRate, setManHourRate] = useState(0)
    const [netIncome, setNetIncome] = useState(0)

    const calculateCallback = useCallback(() => {
        const contractNetIncome = calcContractNetIncome({
            childrenAboveSix,
            childrenBelowSix,
            childrenAboveFifteen,
            companionIncome,
            isSeverelyDisabled,
            monthlyIncome,
            monthsWorked,
        })

        setAnnualNetIncome(contractNetIncome.annualNetIncome)
        setContributions(contractNetIncome.contributions)
        setFirstYearAnnualNetIncome(contractNetIncome.firstYearAnnualNetIncome)
        setFirstYearContributions(contractNetIncome.firstYearContributions)
        setFirstYearNetIncome(contractNetIncome.firstYearIncome)
        setManDayRate(contractNetIncome.manDayRate)
        setManHourRate(contractNetIncome.manHourRate)
        setNetIncome(contractNetIncome.income)
        if (monthlyIncome) setAnnualIncome(to2Decimal(monthlyIncome * 12))
    }, [
        childrenAboveFifteen,
        childrenAboveSix,
        childrenBelowSix,
        companionIncome,
        isSeverelyDisabled,
        monthlyIncome,
        monthsWorked,
    ])

    return {
        annualIncome,
        annualNetIncome,
        contributions,
        firstYearAnnualNetIncome,
        firstYearContributions,
        firstYearNetIncome,
        manDayRate,
        manHourRate,
        netIncome,
        calculate: calculateCallback,
    }
}

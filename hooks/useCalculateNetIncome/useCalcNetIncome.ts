import { useCallback, useState } from 'react'

import { calcNetIncome } from './utils'
import { Contributions, ICalcHookResult } from '../../types'

export const useCalcNetIncome = ({
    monthlyGrossIncome,
    companionIncome,
    monthsWorked = 12,
    isSeverelyDisabled = false,
    childrenBelowSix = 0,
    childrenAboveSix = 0,
}: {
    monthlyGrossIncome: number
    monthsWorked?: number
    isSeverelyDisabled?: boolean
    childrenBelowSix?: number
    childrenAboveSix?: number
    companionIncome?: number
}): ICalcHookResult => {
    const [annualNetIncome, setAnnualNetIncome] = useState<number>(0)
    const [employeeContributions, setEmployeeContributions] =
        useState<Contributions>([])
    const [monthlyNetIncome, setMonthlyNetIncome] = useState<number>(0)

    const calculate = useCallback(() => {
        const { annualIncome, contributions, monthlyIncome } = calcNetIncome({
            monthlyGrossIncome,
            companionIncome,
            monthsWorked,
            isSeverelyDisabled,
            childrenBelowSix,
            childrenAboveSix,
        })

        setAnnualNetIncome(annualIncome)
        setEmployeeContributions(contributions)
        setMonthlyNetIncome(monthlyIncome)
    }, [
        monthlyGrossIncome,
        companionIncome,
        monthsWorked,
        isSeverelyDisabled,
        childrenAboveSix,
        childrenBelowSix,
    ])

    return {
        annualIncome: annualNetIncome,
        contributions: employeeContributions,
        monthlyIncome: monthlyNetIncome,
        calculate,
    }
}

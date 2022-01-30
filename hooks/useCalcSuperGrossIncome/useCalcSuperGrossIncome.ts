import { useCallback, useState } from 'react'

import { calcSuperGrossIncome } from './utils'
import { Contributions, ICalcHookResult } from '../../types'

export const useCalcSuperGrossIncome = ({
    monthlyGrossIncome,
    isSeverelyDisabled = false,
    monthsWorked = 12,
}: {
    monthlyGrossIncome: number
    isSeverelyDisabled?: boolean
    monthsWorked?: number
}): ICalcHookResult => {
    const [annualSuperGrossIncome, setAnnualSuperGrossIncome] = useState(0)
    const [monthlySuperGrossIncome, setMonthlySuperGrossIncome] = useState(0)
    const [employerContributions, setEmployerContributions] =
        useState<Contributions>([])

    const calculate = useCallback(() => {
        const { annualIncome, contributions, monthlyIncome } =
            calcSuperGrossIncome({
                isSeverelyDisabled,
                monthlyGrossIncome,
                monthsWorked,
            })

        setAnnualSuperGrossIncome(annualIncome)
        setMonthlySuperGrossIncome(monthlyIncome)
        setEmployerContributions(contributions)
    }, [isSeverelyDisabled, monthlyGrossIncome, monthsWorked])

    return {
        annualIncome: annualSuperGrossIncome,
        contributions: employerContributions,
        monthlyIncome: monthlySuperGrossIncome,
        calculate,
    }
}

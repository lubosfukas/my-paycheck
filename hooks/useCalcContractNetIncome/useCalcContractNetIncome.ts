import { useCallback, useState } from 'react'

import { calcContractNetIncome } from './utils'
import { CalcResult } from './types'
import { Contributions } from '../../types'

interface ICalcHookResult extends CalcResult {
    calculate: () => void
}

export const useCalcContractNetIncome = ({
    monthlyIncome,
    companionIncome,
    childrenAboveSix = 0,
    childrenBelowSix = 0,
    isSeverelyDisabled = false,
    monthsWorked = 10.5,
}: {
    monthlyIncome: number
    childrenAboveSix?: number
    childrenBelowSix?: number
    isSeverelyDisabled?: boolean
    companionIncome?: number
    monthsWorked?: number
}): ICalcHookResult => {
    const [contractAverageIncome, setContractAverageIncome] = useState(0)
    const [firstYearContractAverageIncome, setFirstYearContractAverageIncome] =
        useState(0)
    const [firstYearContractIncome, setFirstYearContractIncome] = useState(0)
    const [contractIncome, setContractIncome] = useState(0)
    const [contractManDayRate, setContractManDayRate] = useState(0)
    const [contractManHourRate, setContractManHourRate] = useState(0)
    const [contractContributions, setContractContributions] =
        useState<Contributions>([])
    const [firstYearContractContributions, setFirstYearContractContributions] =
        useState<Contributions>([])

    const calculate = useCallback(() => {
        const {
            averageIncome,
            contributions,
            firstYearAverageIncome,
            firstYearContributions,
            firstYearIncome,
            income,
            manDayRate,
            manHourRate,
        } = calcContractNetIncome({
            monthlyIncome,
            companionIncome,
            childrenAboveSix,
            childrenBelowSix,
            isSeverelyDisabled,
            monthsWorked,
        })

        setContractAverageIncome(averageIncome)
        setContractContributions(contributions)
        setFirstYearContractAverageIncome(firstYearAverageIncome)
        setFirstYearContractContributions(firstYearContributions)
        setFirstYearContractIncome(firstYearIncome)
        setContractIncome(income)
        setContractManDayRate(manDayRate)
        setContractManHourRate(manHourRate)
    }, [
        monthlyIncome,
        childrenBelowSix,
        childrenAboveSix,
        isSeverelyDisabled,
        companionIncome,
        monthsWorked,
    ])

    return {
        averageIncome: contractAverageIncome,
        contributions: contractContributions,
        firstYearAverageIncome: firstYearContractAverageIncome,
        firstYearContributions: firstYearContractContributions,
        firstYearIncome: firstYearContractIncome,
        income: contractIncome,
        manDayRate: contractManDayRate,
        manHourRate: contractManHourRate,
        calculate,
    }
}

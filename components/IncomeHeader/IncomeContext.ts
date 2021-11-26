import { createContext, Dispatch, SetStateAction } from 'react'

import { CompanionIncome } from '../../types'

export const IncomeContext = createContext<{
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    monthlyGrossIncome: number
    monthsWorked: number
    companionIncome: CompanionIncome
    setChildrenAboveSix: Dispatch<SetStateAction<number>>
    setChildrenBelowSix: Dispatch<SetStateAction<number>>
    setIsSeverelyDisabled: Dispatch<SetStateAction<boolean>>
    setMonthlyGrossIncome: Dispatch<SetStateAction<number>>
    setMonthsWorked: Dispatch<SetStateAction<number>>
    setCompanionIncome: Dispatch<SetStateAction<CompanionIncome>>
}>({
    childrenAboveSix: 0,
    childrenBelowSix: 0,
    isSeverelyDisabled: false,
    monthlyGrossIncome: 0,
    monthsWorked: 0,
    companionIncome: { applied: false, income: undefined },
    setChildrenAboveSix: () => {},
    setChildrenBelowSix: () => {},
    setIsSeverelyDisabled: () => {},
    setMonthlyGrossIncome: () => {},
    setMonthsWorked: () => {},
    setCompanionIncome: () => {},
})

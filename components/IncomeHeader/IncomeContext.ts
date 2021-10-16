import { createContext, Dispatch, SetStateAction } from 'react'

export const IncomeContext = createContext<{
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    monthlyGrossIncome: number
    monthsWorked: number
    setChildrenAboveSix: Dispatch<SetStateAction<number>>
    setChildrenBelowSix: Dispatch<SetStateAction<number>>
    setIsSeverelyDisabled: Dispatch<SetStateAction<boolean>>
    setMonthlyGrossIncome: Dispatch<SetStateAction<number>>
    setMonthsWorked: Dispatch<SetStateAction<number>>
}>({
    childrenAboveSix: 0,
    childrenBelowSix: 0,
    isSeverelyDisabled: false,
    monthlyGrossIncome: 0,
    monthsWorked: 0,
    setChildrenAboveSix: () => {},
    setChildrenBelowSix: () => {},
    setIsSeverelyDisabled: () => {},
    setMonthlyGrossIncome: () => {},
    setMonthsWorked: () => {},
})

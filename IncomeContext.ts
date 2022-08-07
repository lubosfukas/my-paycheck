import { createContext, Dispatch, SetStateAction } from 'react'

import { Income } from './types'

export const IncomeContext = createContext<
    Income & {
        setChildrenAboveSix: Dispatch<SetStateAction<number>>
        setChildrenBelowSix: Dispatch<SetStateAction<number>>
        setChildrenAboveFifteen: Dispatch<SetStateAction<number>>
        setIsSeverelyDisabled: Dispatch<SetStateAction<boolean>>
        setMonthlyGrossIncome: Dispatch<SetStateAction<number>>
        setMonthsWorked: Dispatch<SetStateAction<number>>
        setCompanionIncome: Dispatch<SetStateAction<number | undefined>>
    }
>({
    childrenAboveSix: 0,
    childrenBelowSix: 0,
    childrenAboveFifteen: 0,
    isSeverelyDisabled: false,
    monthlyGrossIncome: 0,
    monthsWorked: 0,
    companionIncome: undefined,
    setChildrenAboveSix: () => {},
    setChildrenBelowSix: () => {},
    setChildrenAboveFifteen: () => {},
    setIsSeverelyDisabled: () => {},
    setMonthlyGrossIncome: () => {},
    setMonthsWorked: () => {},
    setCompanionIncome: () => {},
})

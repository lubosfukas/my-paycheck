import { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { IncomeContext } from '../IncomeContext'

export const renderWithContext = (
    ui: ReactElement,
    {
        companionIncome = undefined,
        childrenAboveSix = 0,
        childrenBelowSix = 0,
        childrenAboveFifteen = 0,
        isSeverelyDisabled = false,
        monthlyGrossIncome = 0,
        monthsWorked = 0,
        setChildrenAboveSix = () => {},
        setChildrenBelowSix = () => {},
        setChildrenAboveFifteen = () => {},
        setCompanionIncome = () => {},
        setIsSeverelyDisabled = () => {},
        setMonthlyGrossIncome = () => {},
        setMonthsWorked = () => {},
    } = {}
) =>
    render(
        <IncomeContext.Provider
            value={{
                companionIncome,
                childrenAboveSix,
                childrenBelowSix,
                childrenAboveFifteen,
                isSeverelyDisabled,
                monthlyGrossIncome,
                monthsWorked,
                setChildrenAboveSix,
                setChildrenBelowSix,
                setChildrenAboveFifteen,
                setCompanionIncome,
                setIsSeverelyDisabled,
                setMonthlyGrossIncome,
                setMonthsWorked,
            }}
        >
            {ui}
        </IncomeContext.Provider>
    )

export * from '@testing-library/react'

import { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { IncomeContext } from '../components/IncomeHeader/IncomeContext'

export const renderWithContext = (
    ui: ReactElement,
    {
        companionIncome = undefined,
        childrenAboveSix = 0,
        childrenBelowSix = 0,
        isSeverelyDisabled = false,
        monthlyGrossIncome = 0,
        monthsWorked = 0,
        setChildrenAboveSix = () => {},
        setChildrenBelowSix = () => {},
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
                isSeverelyDisabled,
                monthlyGrossIncome,
                monthsWorked,
                setChildrenAboveSix,
                setChildrenBelowSix,
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

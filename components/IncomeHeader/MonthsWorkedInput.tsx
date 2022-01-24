import { useContext } from 'react'

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '../NumberInput'

export const MonthsWorkedInput = () => {
    const { monthsWorked, setMonthsWorked } = useContext(IncomeContext)

    return (
        <NumberInput
            defaultValue={monthsWorked}
            label="Odpracované mesiace"
            max={12}
            min={0}
            onChange={setMonthsWorked}
        />
    )
}

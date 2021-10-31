import { useContext } from 'react'

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '../common/NumberInput'
import { texts } from '../../utils/texts'

export const MonthsWorkedInput = () => {
    const { monthsWorked, setMonthsWorked } = useContext(IncomeContext)

    return (
        <NumberInput
            defaultValue={monthsWorked}
            label={texts['monthsWorkedInput.label']}
            max={12}
            min={0}
            onChange={setMonthsWorked}
        />
    )
}

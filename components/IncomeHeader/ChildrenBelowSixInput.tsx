import { useContext } from 'react'

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '../NumberInput'

export const ChildrenBelowSixInput = () => {
    const { childrenBelowSix, setChildrenBelowSix } = useContext(IncomeContext)

    return (
        <NumberInput
            defaultValue={childrenBelowSix}
            label="Deti pod 6 rokov (vrátane)"
            min={0}
            onChange={setChildrenBelowSix}
        />
    )
}

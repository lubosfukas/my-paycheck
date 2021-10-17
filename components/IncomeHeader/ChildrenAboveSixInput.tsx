import { useContext } from 'react'

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '../NumberInput'

export const ChildrenAboveSixInput = () => {
    const { childrenAboveSix, setChildrenAboveSix } = useContext(IncomeContext)

    return (
        <NumberInput
            defaultValue={childrenAboveSix}
            label="Deti nad 6 rokov"
            min={0}
            onChange={setChildrenAboveSix}
        />
    )
}

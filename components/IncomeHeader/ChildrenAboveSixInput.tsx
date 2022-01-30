import { useContext } from 'react'

import { NumberInput } from '../NumberInput'
import { IncomeContext } from '../../IncomeContext'

export const ChildrenAboveSixInput = () => {
    const { childrenAboveSix, setChildrenAboveSix } = useContext(IncomeContext)

    return (
        <NumberInput
            label="Počet detí nad 6 rokov"
            value={childrenAboveSix}
            setValue={setChildrenAboveSix}
        />
    )
}

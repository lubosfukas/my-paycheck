import { useContext } from 'react'

import { NumberInput } from '../NumberInput'
import { IncomeContext } from '../../IncomeContext'

export const ChildrenAboveFifteen = () => {
    const { childrenAboveFifteen, setChildrenAboveFifteen } =
        useContext(IncomeContext)

    return (
        <NumberInput
            label="Počet detí nad 15 rokov"
            value={childrenAboveFifteen}
            setValue={setChildrenAboveFifteen}
        />
    )
}

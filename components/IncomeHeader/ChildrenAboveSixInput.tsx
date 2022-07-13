import { useContext } from 'react'

import { NumberInput } from '../common'
import { IncomeContext } from '../../IncomeContext'

export const ChildrenAboveSixInput = () => {
    const { childrenAboveSix, setChildrenAboveSix } = useContext(IncomeContext)

    return (
        <NumberInput
            label="Počet detí vo veku od 6 do 15 rokov"
            value={childrenAboveSix}
            setValue={setChildrenAboveSix}
        />
    )
}

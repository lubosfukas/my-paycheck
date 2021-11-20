import { useContext } from 'react'

import { NumberInputMobile } from '../../common'
import { IncomeContext } from '../IncomeContext'

export const ChildrenAboveSixInput = () => {
    const { childrenAboveSix, setChildrenAboveSix } = useContext(IncomeContext)

    return (
        <NumberInputMobile
            label="Počet detí nad 6 rokov"
            value={childrenAboveSix}
            setValue={setChildrenAboveSix}
        />
    )
}

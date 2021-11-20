import { useContext } from 'react'

import { NumberInputMobile } from '../../common'
import { IncomeContext } from '../IncomeContext'

export const ChildrenBelowSixInput = () => {
    const { childrenBelowSix, setChildrenBelowSix } = useContext(IncomeContext)

    return (
        <NumberInputMobile
            label="Počet detí pod 6 rokov (vrátane)"
            value={childrenBelowSix}
            setValue={setChildrenBelowSix}
        />
    )
}

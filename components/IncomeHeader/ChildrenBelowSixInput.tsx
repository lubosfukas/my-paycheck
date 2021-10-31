import { useContext } from 'react'

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '../common/NumberInput'
import { texts } from '../../utils/texts'

export const ChildrenBelowSixInput = () => {
    const { childrenBelowSix, setChildrenBelowSix } = useContext(IncomeContext)

    return (
        <NumberInput
            defaultValue={childrenBelowSix}
            label={texts['childrenBelowSixInput.label']}
            min={0}
            onChange={setChildrenBelowSix}
        />
    )
}

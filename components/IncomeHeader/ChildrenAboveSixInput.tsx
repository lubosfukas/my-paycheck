import { useContext } from 'react'

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '../common/NumberInput'
import { texts } from '../../utils/texts'

export const ChildrenAboveSixInput = () => {
    const { childrenAboveSix, setChildrenAboveSix } = useContext(IncomeContext)

    return (
        <NumberInput
            defaultValue={childrenAboveSix}
            label={texts['childrenAboveSixInput.label']}
            min={0}
            onChange={setChildrenAboveSix}
        />
    )
}

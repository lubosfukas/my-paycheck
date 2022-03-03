import { useContext, useState } from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import { IncomeContext } from '../../IncomeContext'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

export const IncomeInput = () => {
    const [income, setIncome] = useState('')
    const { setMonthlyGrossIncome } = useContext(IncomeContext)
    const isLargerThanTablet = useMediaQuery(device.tablet)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setIncome(newValue)

        if (newValue) setMonthlyGrossIncome(parseInt(newValue))
        else setMonthlyGrossIncome(0)
    }

    const numValue = parseFloat(income)
    const isInvalid = numValue < 700

    return (
        <InputGroup>
            <InputLeftElement
                fontSize={isLargerThanTablet ? 'md' : 'sm'}
                color="gray.400"
                pointerEvents="none"
            >
                €
            </InputLeftElement>
            <Input
                fontSize={isLargerThanTablet ? 'md' : 'sm'}
                isInvalid={isInvalid}
                onChange={onChange}
                placeholder="Zadajte hrubý mesačný príjem (min. 700€)"
                type="number"
                value={income}
            />
        </InputGroup>
    )
}

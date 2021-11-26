import { useContext, useState } from 'react'
import { HStack, Input, Switch, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from './IncomeContext'

const StyledText = styled(Text)`
    ::after {
        content: ':';
    }
`

export const CompanionIncomeInput = () => {
    const [checked, setChecked] = useState(false)
    const [income, setIncome] = useState('')

    const { setCompanionIncome } = useContext(IncomeContext)

    const numIncome = income !== '' ? parseFloat(income) : undefined
    const isInvalid = numIncome === undefined || numIncome < 0
    const isDisabled = !checked

    const handleCheckboxBlurred = () => {
        if (checked) setCompanionIncome({ applied: true, income: numIncome })
        else setCompanionIncome({ applied: false, income: undefined })
    }

    const handleCheckboxChanged = () => setChecked(!checked)

    const handleInputBlurred = () => {
        if (isInvalid) {
            setIncome('')
            setCompanionIncome({ applied: checked, income: undefined })
        } else setCompanionIncome({ applied: checked, income: numIncome })
    }

    const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
        setIncome(event.target.value)

    return (
        <HStack alignItems="center" spacing="4">
            <StyledText whiteSpace="nowrap">
                Nezdaniteľná časť na manželku/manžela
            </StyledText>
            <Switch
                isChecked={checked}
                colorScheme="green"
                onChange={handleCheckboxChanged}
                onBlur={handleCheckboxBlurred}
                whiteSpace="nowrap"
            >
                {checked ? 'Chcem uplatniť' : 'Nechcem uplatniť'}
            </Switch>
            <Input
                focusBorderColor="green.200"
                isDisabled={isDisabled}
                isInvalid={!isDisabled && isInvalid}
                maxW="2xs"
                onChange={handleInputChanged}
                onBlur={handleInputBlurred}
                placeholder="Príjem manželky/manžela"
                type="number"
                value={income}
            />
        </HStack>
    )
}

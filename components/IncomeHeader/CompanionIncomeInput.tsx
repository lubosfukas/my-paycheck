import { useContext, useState } from 'react'
import { HStack, Input, Switch, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from './IncomeContext'

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

export const CompanionIncomeInput = () => {
    const { companionIncome, setCompanionIncome } = useContext(IncomeContext)
    const [checked, setChecked] = useState(companionIncome !== undefined)

    const isInvalid = companionIncome !== undefined && companionIncome < 0

    return (
        <VStack alignItems="start">
            <StyledText>Nezdaniteľná časť na manželku/manžela</StyledText>
            <HStack alignItems="center" spacing="3">
                <Switch
                    colorScheme="green"
                    isChecked={checked}
                    onChange={() => setChecked(!checked)}
                    data-testid="companion-income-input-switch"
                />
                <Text>{checked ? 'Chcem uplatniť' : 'Nechcem uplatniť'}</Text>
            </HStack>
            <Input
                focusBorderColor="green.200"
                isDisabled={!checked}
                isInvalid={checked && isInvalid}
                maxW="2xs"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.value
                    setCompanionIncome(
                        newValue ? parseFloat(newValue) : undefined
                    )
                }}
                placeholder="Príjem manželky/manžela"
                type="number"
                value={companionIncome}
            />
        </VStack>
    )
}

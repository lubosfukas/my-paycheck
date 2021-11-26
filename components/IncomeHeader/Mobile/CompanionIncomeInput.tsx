import { useContext } from 'react'
import { HStack, Input, Switch, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from '../IncomeContext'

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

export const CompanionIncomeInput = () => {
    const {
        companionIncome: { applied, income },
        setCompanionIncome,
    } = useContext(IncomeContext)

    const handleCheckboxChanged = () =>
        setCompanionIncome({ applied: !applied, income })

    const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value

        if (newValue === '') setCompanionIncome({ applied, income: undefined })
        else setCompanionIncome({ applied, income: parseFloat(newValue) })
    }

    const isInvalid = income === undefined || income < 0

    return (
        <VStack alignItems="start">
            <StyledText>Nezdaniteľný príjem manželky/manžela</StyledText>
            <HStack alignItems="center" spacing="3">
                <Switch
                    colorScheme="green"
                    isChecked={applied}
                    onChange={handleCheckboxChanged}
                />
                <Text>{applied ? 'Chcem uplatniť' : 'Nechcem uplatniť'}</Text>
            </HStack>
            <Input
                focusBorderColor="green.200"
                isDisabled={!applied}
                isInvalid={applied && isInvalid}
                maxW="2xs"
                onChange={handleInputChanged}
                placeholder="Príjem manželky/manžela"
                type="number"
                value={income}
            />
        </VStack>
    )
}

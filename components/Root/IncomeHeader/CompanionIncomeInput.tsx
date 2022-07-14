import { useContext } from 'react'
import { Input, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from '../../../IncomeContext'

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

export const CompanionIncomeInput = () => {
    const { companionIncome, setCompanionIncome } = useContext(IncomeContext)

    const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
        setCompanionIncome(parseFloat(event.target.value) ?? undefined)

    return (
        <VStack alignItems="start">
            <StyledText>Nezdaniteľná časť na manželku/manžela</StyledText>
            <Input
                maxW="2xs"
                onChange={handleChanged}
                placeholder="Príjem manželky/manžela"
                type="number"
                value={companionIncome}
            />
        </VStack>
    )
}

import { Input, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { Income } from '../../types'

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

type Props = {
    value: Income['companionIncome']
    onChange: (newValue: Income['companionIncome']) => void
}

export const CompanionIncomeInput = ({ onChange, value }: Props) => (
    <VStack alignItems="start">
        <StyledText>Nezdaniteľná časť na manželku/manžela</StyledText>
        <Input
            maxW="2xs"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = event.target.value
                onChange(newValue ? parseFloat(newValue) : undefined)
            }}
            placeholder="Príjem manželky/manžela"
            type="number"
            value={value?.toString() ?? ''}
        />
    </VStack>
)

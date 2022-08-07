import { HStack, Switch, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { Income } from '../../../types'

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

type Props = {
    value: Income['isSeverelyDisabled']
    onChange: (newValue: Income['isSeverelyDisabled']) => void
}

export const SeverelyDisabledSwitch = ({ onChange, value }: Props) => (
    <VStack alignItems="start">
        <StyledText>Zdravotne ťažko postihnutý</StyledText>
        <HStack alignItems="center" spacing="3">
            <Switch
                data-testid="severely-disabled-switch"
                isChecked={value}
                onChange={() => onChange(!value)}
            />
            <Text>{value ? 'Áno' : 'Nie'}</Text>
        </HStack>
    </VStack>
)

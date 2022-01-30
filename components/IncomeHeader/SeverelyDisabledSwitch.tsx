import { useContext } from 'react'
import { HStack, Switch, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from '../../IncomeContext'

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

export const SeverelyDisabledSwitch = () => {
    const { isSeverelyDisabled, setIsSeverelyDisabled } =
        useContext(IncomeContext)

    return (
        <VStack alignItems="start">
            <StyledText>Zdravotne ťažko postihnutý</StyledText>
            <HStack alignItems="center" spacing="3">
                <Switch
                    data-testid="severely-disabled-switch"
                    isChecked={isSeverelyDisabled}
                    colorScheme="green"
                    onChange={() => setIsSeverelyDisabled(!isSeverelyDisabled)}
                />
                <Text>{isSeverelyDisabled ? 'Áno' : 'Nie'}</Text>
            </HStack>
        </VStack>
    )
}

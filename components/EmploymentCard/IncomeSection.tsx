import { Heading, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { toString2Decimal } from '../../utils/helpers'

const StyledSection = styled.section`
    flex: 1 50%;
    margin-bottom: 1rem;
`

const StyledText = styled(Text)`
    &:after {
        content: '€';
    }
`

export const IncomeSection = ({
    label,
    value,
    cash = true,
    colored = false,
}: {
    label: string
    value: number
    cash?: boolean
    colored?: boolean
}) => {
    const heading = colored ? (
        <Heading color="green.500" mb="2" size="md">
            {label}
        </Heading>
    ) : (
        <Heading mb="2" size="md">
            {label}
        </Heading>
    )

    const text = colored ? (
        <StyledText color="green.500" fontWeight="bold" fontSize="lg">
            {toString2Decimal(value)}
        </StyledText>
    ) : (
        <StyledText fontWeight="bold" fontSize="lg">
            {toString2Decimal(value)}
        </StyledText>
    )

    return (
        <StyledSection>
            {heading}
            {cash ? (
                text
            ) : (
                <Text fontWeight="bold" fontSize="lg">
                    {value}
                </Text>
            )}
        </StyledSection>
    )
}

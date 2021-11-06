import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { toString2Decimal } from '../../../utils/helpers'

const StyledSection = styled.section`
    flex: 1 33%;
    margin-bottom: 1rem;
`

type Props = {
    label: string
    value: number
    cash?: boolean
    colored?: boolean
}

export const IncomeSection = ({
    label,
    value,
    cash = true,
    colored = false,
}: Props) => (
    <StyledSection>
        <Text
            color={colored ? 'green.500' : 'current'}
            fontWeight="bold"
            mb="2"
            fontSize="lg"
        >
            {label}
        </Text>
        <Text
            color={colored ? 'green.500' : 'current'}
            fontWeight="bold"
            fontSize="lg"
        >
            {cash ? `${toString2Decimal(value)}€` : value}
        </Text>
    </StyledSection>
)

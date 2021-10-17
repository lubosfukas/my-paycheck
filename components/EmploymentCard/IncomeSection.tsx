import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { useMediaQuery } from '../../hooks'
import { toString2Decimal } from '../../utils/helpers'
import { device } from '../../utils/device'

const StyledSection = styled.section`
    flex: 1 50%;
    margin-bottom: 1rem;
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
    const isLargerThanTablet = useMediaQuery(device.tablet)

    return (
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
}

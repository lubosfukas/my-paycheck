import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import CountUp from 'react-countup'

export const hasDecimal = (num: number) => num % 1 !== 0

export const countDecimals = (num: number) => {
    if (!hasDecimal(num)) return 0
    return num.toString().split('.')[1].length || 0
}

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
}: Props) => {
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
            <CountUp
                start={0}
                end={value}
                duration={0.5}
                delay={0}
                suffix={cash ? '€' : ''}
                decimals={cash ? 2 : countDecimals(value)}
            >
                {({ countUpRef }) => (
                    <Text
                        color={colored ? 'green.500' : 'current'}
                        fontWeight="bold"
                        fontSize="lg"
                    >
                        <span ref={countUpRef} />
                    </Text>
                )}
            </CountUp>
        </StyledSection>
    )
}

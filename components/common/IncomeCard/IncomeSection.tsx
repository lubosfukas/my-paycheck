import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import styled from '@emotion/styled'
import CountUp from 'react-countup'

export const hasDecimal = (num: number) => num % 1 !== 0

export const countDecimals = (num: number) => {
    if (!hasDecimal(num)) return 0
    return num.toString().split('.')[1].length || 0
}

const StyledSection = styled.section`
    flex: 1 33%;

    @media (max-width: 768px) {
        margin-bottom: 1rem;
    }
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
        <Stat>
            <StatLabel
                color={colored ? 'green.500' : 'current'}
                fontWeight="bold"
                fontSize="lg"
            >
                {label}
            </StatLabel>
            <CountUp
                start={0}
                end={value}
                duration={0.5}
                delay={0}
                suffix={cash ? '€' : ''}
                decimals={cash ? 2 : countDecimals(value)}
            >
                {({ countUpRef }) => (
                    <StatNumber
                        color={colored ? 'green.500' : 'current'}
                        fontWeight="bold"
                        fontSize="lg"
                        ref={countUpRef}
                    />
                )}
            </CountUp>
        </Stat>
    </StyledSection>
)

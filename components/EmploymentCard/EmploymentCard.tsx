import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

const StyledSection = styled.section`
    flex: 1 33%;
`

const StyledText = styled(Text)`
    &:after {
        content: '€';
    }
`

const Section = ({
    label,
    value,
    cash = true,
}: {
    label: string
    value: number
    cash?: boolean
}) => (
    <StyledSection>
        <Heading mb="2" size="md">
            {label}
        </Heading>
        {cash ? (
            <StyledText fontWeight="bold" fontSize="lg">
                {(Math.round(value * 100) / 100).toFixed(2)}
            </StyledText>
        ) : (
            <Text fontWeight="bold" fontSize="lg">
                {value}
            </Text>
        )}
    </StyledSection>
)

type Props = {
    monthlyNetIncome: number
    monthsWorked: number
    annualNetIncome: number
}

const EmploymentCard = ({
    monthlyNetIncome,
    monthsWorked,
    annualNetIncome,
}: Props) => {
    return (
        <Box bg="white" borderRadius="lg" mt="8" mx="auto" maxW="1024px" p="16">
            <Heading mb="2" size="lg">
                Zamestnanie
            </Heading>
            <Text mb="8" fontSize="lg">
                Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere.
            </Text>
            <Flex wrap="wrap">
                <Section
                    label="Čistý mesačný príjem"
                    value={monthlyNetIncome}
                />
                <Section
                    cash={false}
                    label="Odpracované mesiace v roku"
                    value={monthsWorked}
                />
                <Section label="Čistá ročná mzda" value={annualNetIncome} />
            </Flex>
        </Box>
    )
}

export default EmploymentCard

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

const Section = ({ label, value }: { label: string; value: number }) => (
    <StyledSection>
        <Heading mb="2" size="md">
            {label}
        </Heading>
        <StyledText fontWeight="bold" fontSize="lg">
            {(Math.round(value * 100) / 100).toFixed(2)}
        </StyledText>
    </StyledSection>
)

type Props = {
    netMonthlyIncome: number
    monthsWorked: number
    grossAnnualSalary: number
}

const EmploymentCard = ({
    netMonthlyIncome,
    monthsWorked,
    grossAnnualSalary,
}: Props) => {
    return (
        <Box bg="white" borderRadius="lg" mt="8" mx="auto" maxW="1024px" p="16">
            <Heading mb="2" size="lg">
                Zamestananie
            </Heading>
            <Text mb="8" fontSize="lg">
                Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere.
            </Text>
            <Flex wrap="wrap">
                <Section
                    label="Čistý mesačný príjem"
                    value={netMonthlyIncome}
                />
                <Section
                    label="Odpracované mesiace v roku"
                    value={monthsWorked}
                />
                <Section
                    label="Superhrubá ročná mzda"
                    value={grossAnnualSalary}
                />
            </Flex>
        </Box>
    )
}

export default EmploymentCard

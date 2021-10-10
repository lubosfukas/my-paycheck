import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

import EmployeeContributionsTable from './EmployeeContributionsTable'
import { toString2Decimal } from '../../utils/helpers'

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
                {toString2Decimal(value)}
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
    isSeverelyDisabled: boolean
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    unemploymentInsurance: number
    incomeTax: number
}

const EmploymentCard = ({
    monthlyNetIncome,
    monthsWorked,
    annualNetIncome,
    isSeverelyDisabled,
    healthInsurance,
    socialInsurance,
    medicareInsurance,
    retirementInsurance,
    disabilityInsurance,
    unemploymentInsurance,
    incomeTax,
}: Props) => {
    return (
        <Box bg="white" borderRadius="lg" my="8" mx="auto" maxW="1024px" p="16">
            <Heading mb="2" size="lg">
                Zamestnanie
            </Heading>
            <Text fontSize="lg">
                Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere.
            </Text>
            <Flex my="8" wrap="wrap">
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
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton pl="0">
                        <Box>Odvody zamestnanca</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pl="0">
                        <EmployeeContributionsTable
                            monthsWorked={monthsWorked}
                            isSeverelyDisabled={isSeverelyDisabled}
                            healthInsurance={healthInsurance}
                            socialInsurance={socialInsurance}
                            medicareInsurance={medicareInsurance}
                            retirementInsurance={retirementInsurance}
                            disabilityInsurance={disabilityInsurance}
                            unemploymentInsurance={unemploymentInsurance}
                            incomeTax={incomeTax}
                        />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

export default EmploymentCard

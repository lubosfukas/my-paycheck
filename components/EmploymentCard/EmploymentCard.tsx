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
import EmployerContributionsTable from './EmployerContributionsTable'
import { toString2Decimal } from '../../utils/helpers'

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

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

type EmployeeContributions = {
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    unemploymentInsurance: number
    incomeTax: number
}

type EmployerContributions = {
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    unemploymentInsurance: number
    guaranteeFund: number
    reserveFund: number
    injuryInsurance: number
}

type Props = {
    monthlyNetIncome: number
    annualNetIncome: number
    monthlySuperGrossIncome: number
    annualSuperGrossIncome: number
    monthsWorked: number
    isSeverelyDisabled: boolean
    employeeContributions: EmployeeContributions
    employerContributions: EmployerContributions
}

const EmploymentCard = ({
    monthlyNetIncome,
    monthlySuperGrossIncome,
    monthsWorked,
    isSeverelyDisabled,
    employeeContributions,
    employerContributions,
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
                    colored
                />
                <Section
                    cash={false}
                    label="Odpracované mesiace"
                    value={monthsWorked}
                />
                <Section
                    label="Superhrubá mesačná mzda"
                    value={monthlySuperGrossIncome}
                />
            </Flex>
            <Accordion allowMultiple>
                <StyledAccordionItem>
                    <AccordionButton pl="0">
                        <Box fontWeight="bold">Odvody zamestnanca</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pl="0">
                        <EmployeeContributionsTable
                            monthsWorked={monthsWorked}
                            isSeverelyDisabled={isSeverelyDisabled}
                            {...employeeContributions}
                        />
                    </AccordionPanel>
                </StyledAccordionItem>
                <StyledAccordionItem>
                    <AccordionButton pl="0">
                        <Box fontWeight="bold">Odvody zamestnávateľa</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pl="0">
                        <EmployerContributionsTable
                            monthsWorked={monthsWorked}
                            isSeverelyDisabled={isSeverelyDisabled}
                            {...employerContributions}
                        />
                    </AccordionPanel>
                </StyledAccordionItem>
            </Accordion>
        </Box>
    )
}

export default EmploymentCard

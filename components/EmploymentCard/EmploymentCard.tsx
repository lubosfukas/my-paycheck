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

import { IncomeSection } from './IncomeSection'
import { EmployeeContributionsTable } from './EmployeeContributionsTable'
import { EmployerContributionsTable } from './EmployerContributionsTable'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { texts } from '../../utils/texts'

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

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
    annualNetIncome,
    monthlySuperGrossIncome,
    annualSuperGrossIncome,
    monthsWorked,
    isSeverelyDisabled,
    employeeContributions,
    employerContributions,
}: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)
    const isLargerThanLaptop = useMediaQuery(device.laptop)

    return (
        <Box
            bg="white"
            borderRadius="lg"
            my={isLargerThanLaptop ? '8' : '4'}
            mx={isLargerThanTablet ? 'auto' : '4'}
            maxW={isLargerThanLaptop ? '1024px' : '768px'}
            p={isLargerThanTablet ? '16' : '8'}
        >
            <Heading mb="2" size="lg">
                {texts['employmentCard.title']}
            </Heading>
            <Text>{texts['employmentCard.description']}</Text>
            <Flex
                direction={isLargerThanTablet ? 'row' : 'column'}
                my="6"
                wrap={isLargerThanTablet ? 'wrap' : 'nowrap'}
            >
                <IncomeSection
                    label={texts['employmentCard.monthlyNetIncome']}
                    value={monthlyNetIncome}
                    colored
                />
                <IncomeSection
                    label={texts['employmentCard.annualNetIncome']}
                    value={annualNetIncome}
                />
                <IncomeSection
                    label={texts['employmentCard.monthlySuperGrossIncome']}
                    value={monthlySuperGrossIncome}
                />
                <IncomeSection
                    label={texts['employmentCard.annualSuperGrossIncome']}
                    value={annualSuperGrossIncome}
                />
            </Flex>
            {isLargerThanTablet && (
                <Accordion allowMultiple>
                    <StyledAccordionItem id="employee-contributions">
                        <AccordionButton pl="0">
                            <Box fontWeight="bold">
                                {texts['employmentCard.employeeContributions']}
                            </Box>
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
                    <StyledAccordionItem id="employer-contributions">
                        <AccordionButton pl="0">
                            <Box fontWeight="bold">
                                {texts['employmentCard.employerContributions']}
                            </Box>
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
            )}
        </Box>
    )
}

export default EmploymentCard

import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import {
    employerHealthInsurancePercentage,
    employerSeverelyDisabledHealthInsurancePercentage,
    medicareInsurancePercentage,
    employerRetirementInsurancePercentage,
    disabilityInsurancePercentage,
    unemploymentInsurancePercentage,
    employerGuaranteeFundPercentage,
    employerReserveFundPercentage,
    employerInjuryInsurancePercentage,
} from '../../utils/constants'
import { toString2Decimal } from '../../utils/helpers'
import { texts } from '../../utils/texts'

type Props = {
    monthsWorked: number
    isSeverelyDisabled: boolean
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

export const EmployerContributionsTable = ({
    monthsWorked,
    isSeverelyDisabled,
    healthInsurance,
    socialInsurance,
    medicareInsurance,
    retirementInsurance,
    disabilityInsurance,
    unemploymentInsurance,
    guaranteeFund,
    reserveFund,
    injuryInsurance,
}: Props) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? employerSeverelyDisabledHealthInsurancePercentage
        : employerHealthInsurancePercentage

    const monthlyContributions = healthInsurance + socialInsurance
    const annualContributions = monthlyContributions * 12

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th fontSize="md" pl="0">
                        {texts['employerContributionsTable.contributions']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        %
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['employerContributionsTable.monthly']}
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        {texts['employerContributionsTable.annual']}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td pl="0">
                        {texts['employerContributionsTable.healthInsurance']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(healthInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(healthInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(healthInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {texts['employerContributionsTable.medicareInsurance']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(medicareInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(medicareInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(medicareInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {
                            texts[
                                'employerContributionsTable.retirementInsurance'
                            ]
                        }
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(
                            employerRetirementInsurancePercentage
                        )}
                    </Td>
                    <Td isNumeric>{toString2Decimal(retirementInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(retirementInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {
                            texts[
                                'employerContributionsTable.disabilityInsurance'
                            ]
                        }
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(disabilityInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(disabilityInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(disabilityInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {
                            texts[
                                'employerContributionsTable.unemploymentInsurance'
                            ]
                        }
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(unemploymentInsurancePercentage)}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(unemploymentInsurance)}€
                    </Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(unemploymentInsurance * monthsWorked)}
                        €
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {texts['employerContributionsTable.guaranteeFund']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(employerGuaranteeFundPercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(guaranteeFund)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(guaranteeFund * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {texts['employerContributionsTable.reserveFund']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(employerReserveFundPercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(reserveFund)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(reserveFund * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {texts['employerContributionsTable.injuryInsurance']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(employerInjuryInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(injuryInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(injuryInsurance * monthsWorked)}€
                    </Td>
                </Tr>
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th fontSize="md" pl="0">
                        {texts['employerContributionsTable.sum']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {toString2Decimal(
                            healthInsurancePercentage +
                                medicareInsurancePercentage +
                                employerRetirementInsurancePercentage +
                                disabilityInsurancePercentage +
                                unemploymentInsurancePercentage
                        )}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {toString2Decimal(monthlyContributions)}€
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        {toString2Decimal(annualContributions)}€
                    </Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

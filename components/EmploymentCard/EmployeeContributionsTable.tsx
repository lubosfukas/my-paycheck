import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import {
    employeeHealthInsurancePercentage,
    employeeSeverelyDisabledHealthInsurancePercentage,
    medicareInsurancePercentage,
    employeeRetirementInsurancePercentage,
    disabilityInsurancePercentage,
    unemploymentInsurancePercentage,
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
    incomeTax: number
}

export const EmployeeContributionsTable = ({
    monthsWorked,
    isSeverelyDisabled,
    healthInsurance,
    socialInsurance,
    medicareInsurance,
    retirementInsurance,
    disabilityInsurance,
    unemploymentInsurance,
    incomeTax,
}: Props) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? employeeSeverelyDisabledHealthInsurancePercentage
        : employeeHealthInsurancePercentage

    const monthlyContributions = healthInsurance + socialInsurance + incomeTax
    const annualContributions = monthlyContributions * monthsWorked
    const insurancePercentageSum = toString2Decimal(
        healthInsurancePercentage +
            medicareInsurancePercentage +
            employeeRetirementInsurancePercentage +
            disabilityInsurancePercentage +
            unemploymentInsurancePercentage
    )

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th fontSize="md" pl="0">
                        {texts['employeeContributionsTable.contributions']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        %
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['employeeContributionsTable.monthly']}
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        {texts['employeeContributionsTable.annual']}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td pl="0">
                        {texts['employeeContributionsTable.healthInsurance']}
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
                        {texts['employeeContributionsTable.medicareInsurance']}
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
                                'employeeContributionsTable.retirementInsurance'
                            ]
                        }
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(
                            employeeRetirementInsurancePercentage
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
                                'employeeContributionsTable.disabilityInsurance'
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
                                'employeeContributionsTable.unemploymentInsurance'
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
                        {texts['employeeContributionsTable.incomeTax']}
                    </Td>
                    <Td isNumeric>-</Td>
                    <Td isNumeric>{toString2Decimal(incomeTax)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(incomeTax * monthsWorked)}€
                    </Td>
                </Tr>
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th fontSize="md" pl="0">
                        {texts['employeeContributionsTable.sum']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['employeeContributionsTable.tax']} {'+'}
                        {insurancePercentageSum}
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

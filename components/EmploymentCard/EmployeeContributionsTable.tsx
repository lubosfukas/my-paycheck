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

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th fontSize="md" pl="0">
                        ODVODY
                    </Th>
                    <Th fontSize="md" isNumeric>
                        %
                    </Th>
                    <Th fontSize="md" isNumeric>
                        Mesačné
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        Ročné
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td pl="0">Zdravotné poistenie</Td>
                    <Td isNumeric>
                        {toString2Decimal(healthInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(healthInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(healthInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">Nemocenské poistenie</Td>
                    <Td isNumeric>
                        {toString2Decimal(medicareInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(medicareInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(medicareInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">Starobné poistenie</Td>
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
                    <Td pl="0">Invalidné poistenie</Td>
                    <Td isNumeric>
                        {toString2Decimal(disabilityInsurancePercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(disabilityInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(disabilityInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">Poistenie v nezamestnanosti</Td>
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
                    <Td pl="0">Daň z príjmu</Td>
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
                        Spolu
                    </Th>
                    <Th fontSize="md" isNumeric>
                        daň +
                        {toString2Decimal(
                            healthInsurancePercentage +
                                medicareInsurancePercentage +
                                employeeRetirementInsurancePercentage +
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

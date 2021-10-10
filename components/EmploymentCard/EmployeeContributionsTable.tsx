import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import { toString2Decimal } from '../../utils/helpers'
import {
    employeeHealthInsurancePercentage,
    severelyDisabledEmployeeHealthInsuracePercentage,
    employeeMedicareInsurancePercentage,
    employeeRetirementInsurancePercentage,
    employeeDisabilityInsurancePercentage,
    employeeUnemploymentInsurancePercentage,
} from '../../utils/constants'

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

const EmployeeContributionsTable = ({
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
        ? severelyDisabledEmployeeHealthInsuracePercentage
        : employeeHealthInsurancePercentage

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th pl="0">{}</Th>
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
                        {toString2Decimal(employeeMedicareInsurancePercentage)}
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
                        {toString2Decimal(
                            employeeDisabilityInsurancePercentage
                        )}
                    </Td>
                    <Td isNumeric>{toString2Decimal(disabilityInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(disabilityInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">Poistenie v nezamestnanosti</Td>
                    <Td isNumeric>
                        {toString2Decimal(
                            employeeUnemploymentInsurancePercentage
                        )}
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
                                employeeMedicareInsurancePercentage +
                                employeeRetirementInsurancePercentage +
                                employeeDisabilityInsurancePercentage +
                                employeeUnemploymentInsurancePercentage
                        )}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {toString2Decimal(
                            healthInsurance + socialInsurance + incomeTax
                        )}
                        €
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        {toString2Decimal(
                            (healthInsurance + socialInsurance + incomeTax) *
                                monthsWorked
                        )}
                        €
                    </Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default EmployeeContributionsTable

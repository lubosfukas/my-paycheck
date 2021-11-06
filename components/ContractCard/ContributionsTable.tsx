import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import {
    contractorDisabilityInsurancePercentage,
    contractorHealthInsurancePercentage,
    contractorMedicareInsurancePercentage,
    contractorReserveFundPercentage,
    contractorRetirementInsurancePercentage,
    contractorSeverelyDisabledHealthInsurancePercentage,
} from '../../utils/constants'
import { toString2Decimal } from '../../utils/helpers'
import { texts } from '../../utils/texts'
import { ContractContributions } from '../../types'

interface IProps extends ContractContributions {
    isSeverelyDisabled: boolean
    monthsWorked?: number
}

export const ContributionsTable = ({
    isSeverelyDisabled,
    healthInsurance,
    socialInsurance,
    medicareInsurance,
    retirementInsurance,
    disabilityInsurance,
    reserveFund,
    incomeTax,
    monthsWorked = 12,
}: IProps) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? contractorSeverelyDisabledHealthInsurancePercentage
        : contractorHealthInsurancePercentage

    const monthlyContributions = healthInsurance + socialInsurance + incomeTax
    const annualContributions = monthlyContributions * monthsWorked
    const insurancePercentageSum = toString2Decimal(
        healthInsurancePercentage +
            contractorMedicareInsurancePercentage +
            contractorRetirementInsurancePercentage +
            contractorDisabilityInsurancePercentage +
            contractorReserveFundPercentage
    )

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th fontSize="md" pl="0">
                        {texts['contractContributionsTable.title']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        %
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['contractContributionsTable.monthly']}
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        {texts['contractContributionsTable.annual']}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td pl="0">
                        {texts['contractContributionsTable.healthInsurance']}
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
                        {texts['contractContributionsTable.medicareInsurance']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(
                            contractorMedicareInsurancePercentage
                        )}
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
                                'contractContributionsTable.retirementInsurance'
                            ]
                        }
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(
                            contractorRetirementInsurancePercentage
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
                                'contractContributionsTable.disabilityInsurance'
                            ]
                        }
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(
                            contractorDisabilityInsurancePercentage
                        )}
                    </Td>
                    <Td isNumeric>{toString2Decimal(disabilityInsurance)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(disabilityInsurance * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {texts['contractContributionsTable.reserveFund']}
                    </Td>
                    <Td isNumeric>
                        {toString2Decimal(contractorReserveFundPercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(reserveFund)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(reserveFund * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">
                        {texts['contractContributionsTable.incomeTax']}
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
                        {texts['contractContributionsTable.sum']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['contractContributionsTable.tax']} {'+'}{' '}
                        {insurancePercentageSum}
                        {'%'}
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

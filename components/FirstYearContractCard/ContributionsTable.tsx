import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import {
    contractorHealthInsurancePercentage,
    contractorSeverelyDisabledHealthInsurancePercentage,
} from '../../utils/constants'
import { toString2Decimal } from '../../utils/helpers'
import { texts } from '../../utils/texts'

type Props = {
    isSeverelyDisabled: boolean
    healthInsurance: number
    incomeTax: number
    monthsWorked?: number
}

export const ContributionsTable = ({
    isSeverelyDisabled,
    healthInsurance,
    incomeTax,
    monthsWorked = 12,
}: Props) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? contractorSeverelyDisabledHealthInsurancePercentage
        : contractorHealthInsurancePercentage

    const monthlyContributions = healthInsurance + incomeTax
    const annualContributions = monthlyContributions * monthsWorked

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th fontSize="md" pl="0">
                        {texts['firstYearContractContributionsTable.title']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        %
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['firstYearContractContributionsTable.monthly']}
                    </Th>
                    <Th fontSize="md" isNumeric pr="0">
                        {texts['firstYearContractContributionsTable.annual']}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td pl="0">
                        {
                            texts[
                                'firstYearContractContributionsTable.healthInsurance'
                            ]
                        }
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
                        {texts['firstYearContractContributionsTable.incomeTax']}
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
                        {texts['firstYearContractContributionsTable.sum']}
                    </Th>
                    <Th fontSize="md" isNumeric>
                        {texts['firstYearContractContributionsTable.tax']} {'+'}{' '}
                        {healthInsurancePercentage}
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

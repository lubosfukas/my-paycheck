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

const EmployerContributionsTable = ({
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
                            employerRetirementInsurancePercentage
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
                    <Td pl="0">Garančný fond</Td>
                    <Td isNumeric>
                        {toString2Decimal(employerGuaranteeFundPercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(guaranteeFund)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(guaranteeFund * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">Rezervný fond</Td>
                    <Td isNumeric>
                        {toString2Decimal(employerReserveFundPercentage)}
                    </Td>
                    <Td isNumeric>{toString2Decimal(reserveFund)}€</Td>
                    <Td isNumeric pr="0">
                        {toString2Decimal(reserveFund * monthsWorked)}€
                    </Td>
                </Tr>
                <Tr>
                    <Td pl="0">Úrazové poistenie</Td>
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
                        Spolu
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

export default EmployerContributionsTable

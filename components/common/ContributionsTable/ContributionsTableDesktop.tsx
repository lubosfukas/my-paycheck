import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import { toString2Decimal } from '../../../utils/helpers'
import { Props } from './types'

export const ContributionsTableDesktop = ({ id, contributions }: Props) => {
    const sum = contributions.find(({ isSum }) => isSum)
    const sumPercentage =
        sum && sum.percentage ? toString2Decimal(sum.percentage) : '-'
    const sumPercentageText = sum?.hasTax
        ? `Daň + ${sumPercentage}%`
        : `${sumPercentage}%`

    return (
        <Table id={id}>
            <Thead>
                <Tr>
                    <Th fontSize="md" pl="0">
                        Odvody
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
                {contributions.map(
                    ({
                        annualContributions,
                        isSum,
                        label,
                        monthlyContributions,
                        percentage,
                    }) => {
                        const percentageText = percentage
                            ? `${toString2Decimal(percentage)}`
                            : '-'

                        if (isSum) return undefined

                        return (
                            <Tr
                                key={`${id}-${label}-percentage-${percentageText}`}
                            >
                                <Td pl="0">{label}</Td>
                                <Td isNumeric>{percentageText}</Td>
                                <Td isNumeric>
                                    {toString2Decimal(monthlyContributions)}€
                                </Td>
                                <Td isNumeric pr="0">
                                    {toString2Decimal(annualContributions)}€
                                </Td>
                            </Tr>
                        )
                    }
                )}
            </Tbody>

            {sum && (
                <Tfoot>
                    <Tr>
                        <Th fontSize="md" pl="0">
                            {sum.label}
                        </Th>
                        <Th fontSize="md" isNumeric>
                            {sumPercentageText}
                        </Th>
                        <Th fontSize="md" isNumeric>
                            {toString2Decimal(sum.monthlyContributions)}€
                        </Th>
                        <Th fontSize="md" isNumeric pr="0">
                            {toString2Decimal(sum.annualContributions)}€
                        </Th>
                    </Tr>
                </Tfoot>
            )}
        </Table>
    )
}

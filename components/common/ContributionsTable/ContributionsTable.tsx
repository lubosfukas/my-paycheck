import { Table, Tbody, Td, Tfoot, Thead, Th, Tr } from '@chakra-ui/react'

import { Contributions } from '../../../types'
import { toString2Decimal } from '../../../utils/helpers'

type Props = {
    id: string
    contributions: Contributions
}

export const ContributionsTable = ({ id, contributions }: Props) => {
    const sum = contributions.find((x) => x.isSum)
    const percentage =
        sum && sum.percentage ? toString2Decimal(sum.percentage) : '-'
    const percentageString = sum?.hasTax
        ? `Daň + ${percentage}%`
        : `${percentage}%`

    return (
        <Table>
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
                {contributions.map((x) => {
                    const percentage = x.percentage
                        ? `${toString2Decimal(x.percentage)}`
                        : '-'

                    if (x.isSum) return undefined

                    return (
                        <Tr key={`${id}-${x.label}-percentage-${percentage}`}>
                            <Td pl="0">{x.label}</Td>
                            <Td isNumeric>{percentage}</Td>
                            <Td isNumeric>
                                {toString2Decimal(x.monthlyContributions)}€
                            </Td>
                            <Td isNumeric pr="0">
                                {toString2Decimal(x.annualContributions)}€
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>

            {sum && (
                <Tfoot>
                    <Tr>
                        <Th fontSize="md" pl="0">
                            {sum.label}
                        </Th>
                        <Th fontSize="md" isNumeric>
                            {percentageString}
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

import { Table, Tbody, Td, Tr } from '@chakra-ui/react'

import { toString2Decimal } from '../../../utils/helpers'
import { Contributions } from '../../../types'

type Props = {
    id: string
    contributions: Contributions
}

export const ContributionsTableMobile = ({ id, contributions }: Props) => (
    <Table>
        <Tbody>
            {contributions.map((x) => {
                const percentage = x.percentage
                    ? `${toString2Decimal(x.percentage)}%`
                    : '-'

                return (
                    <>
                        <Tr
                            key={`${id}-${x.label}-percentage-${percentage}`}
                            fontWeight="bold"
                        >
                            <Td pl="0">{x.label}</Td>
                            <Td isNumeric px="0">
                                {percentage}
                            </Td>
                        </Tr>
                        <Tr
                            key={`${id}-${x.label}-monthly-${x.monthlyContributions}`}
                        >
                            <Td pl="0">Mesačne</Td>
                            <Td isNumeric px="0">
                                {toString2Decimal(x.monthlyContributions)}€
                            </Td>
                        </Tr>
                        <Tr
                            key={`${id}-${x.label}-annual-${x.annualContributions}`}
                        >
                            <Td pl="0">Ročne</Td>
                            <Td isNumeric px="0">
                                {toString2Decimal(x.annualContributions)}€
                            </Td>
                        </Tr>
                    </>
                )
            })}
        </Tbody>
    </Table>
)

import { Table, Tbody, Td, Tr } from '@chakra-ui/react'

import { toString2Decimal } from '../../../utils/helpers'
import { Contributions } from '../../../types'

type Props = {
    contributions: Contributions
}

export const ContributionsTableMobile = ({ contributions }: Props) => (
    <Table>
        <Tbody>
            {contributions.map((x) => {
                const percentage = x.percentage
                    ? `${toString2Decimal(x.percentage)}%`
                    : '-'

                return (
                    <>
                        <Tr key={x.label} fontWeight="bold">
                            <Td pl="0">{x.label}</Td>
                            <Td isNumeric px="0">
                                {percentage}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td pl="0">Mesačne</Td>
                            <Td isNumeric px="0">
                                {toString2Decimal(x.monthlyContributions)}€
                            </Td>
                        </Tr>
                        <Tr>
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

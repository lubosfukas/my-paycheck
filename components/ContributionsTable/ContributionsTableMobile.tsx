import React from 'react'
import { Table, Tbody, Td, Tr } from '@chakra-ui/react'

import { toString2Decimal } from '../../utils/helpers'
import { Props } from './types'

export const ContributionsTableMobile = ({ id, contributions }: Props) => (
    <Table id={id}>
        <Tbody>
            {contributions.map((x) => {
                const percentage = x.percentage
                    ? x.hasTax
                        ? `Daň + ${toString2Decimal(x.percentage)}%`
                        : `${toString2Decimal(x.percentage)}%`
                    : '-'

                return (
                    <React.Fragment key={`${id}-${x.label}`}>
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
                    </React.Fragment>
                )
            })}
        </Tbody>
    </Table>
)

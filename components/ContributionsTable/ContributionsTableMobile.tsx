import React from 'react'
import { Table, Tbody, Td, Tr } from '@chakra-ui/react'

import { toString2Decimal } from '../../utils/helpers'
import { Props } from './types'

export const ContributionsTableMobile = ({ id, contributions }: Props) => (
    <Table id={id}>
        <Tbody>
            {contributions.map(
                ({
                    annualContributions,
                    hasTax,
                    label,
                    monthlyContributions,
                    percentage,
                }) => {
                    const percentageText = percentage
                        ? hasTax
                            ? `Daň + ${toString2Decimal(percentage)}%`
                            : `${toString2Decimal(percentage)}%`
                        : '-'

                    return (
                        <React.Fragment key={`${id}-${label}`}>
                            <Tr
                                key={`${id}-${label}-percentage-${percentageText}`}
                                fontWeight="bold"
                            >
                                <Td pl="0">{label}</Td>
                                <Td isNumeric px="0">
                                    {percentageText}
                                </Td>
                            </Tr>
                            <Tr
                                key={`${id}-${label}-monthly-${monthlyContributions}`}
                            >
                                <Td pl="0">Mesačne</Td>
                                <Td isNumeric px="0">
                                    {toString2Decimal(monthlyContributions)}€
                                </Td>
                            </Tr>
                            <Tr
                                key={`${id}-${label}-annual-${annualContributions}`}
                            >
                                <Td pl="0">Ročne</Td>
                                <Td isNumeric px="0">
                                    {toString2Decimal(annualContributions)}€
                                </Td>
                            </Tr>
                        </React.Fragment>
                    )
                }
            )}
        </Tbody>
    </Table>
)

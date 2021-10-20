import { useMemo, useState } from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from './IncomeContext'
import { IncomeInput } from './IncomeInput'
import { OtherCriteriaAccordion } from './OtherCriteriaAccordion'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { texts } from '../../utils/texts'

const StyledVStack = styled(VStack)`
    > :last-child {
        margin-top: 1rem;
    }
`

type Props = {
    onConfirm: ({
        monthlyGrossIncome,
        monthsWorked,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
        companionIncome,
    }: {
        monthlyGrossIncome: number
        monthsWorked: number
        isSeverelyDisabled: boolean
        childrenBelowSix: number
        childrenAboveSix: number
        companionIncome?: number
    }) => void
}

export const IncomeHeader = ({ onConfirm }: Props) => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)
    const [companionIncome, setCompanionIncome] = useState<number | undefined>()

    const value = useMemo(
        () => ({
            childrenAboveSix,
            setChildrenAboveSix,
            childrenBelowSix,
            setChildrenBelowSix,
            isSeverelyDisabled,
            setIsSeverelyDisabled,
            monthlyGrossIncome,
            setMonthlyGrossIncome,
            monthsWorked,
            setMonthsWorked,
            companionIncome,
            setCompanionIncome,
        }),
        [
            childrenAboveSix,
            childrenBelowSix,
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
            companionIncome,
        ]
    )

    const isLargerThanTablet = useMediaQuery(device.tablet)
    const isLargerThanLaptop = useMediaQuery(device.laptop)

    const handleOnConfirm = () =>
        onConfirm({
            monthlyGrossIncome,
            monthsWorked,
            isSeverelyDisabled,
            childrenBelowSix,
            childrenAboveSix,
            companionIncome,
        })

    return (
        <IncomeContext.Provider value={value}>
            <Box
                bg="white"
                m={isLargerThanTablet ? 'none' : '4'}
                p={isLargerThanTablet ? 16 : 8}
            >
                <StyledVStack
                    align="stretch"
                    mx="auto"
                    maxW={isLargerThanLaptop ? '1024px' : '768px'}
                >
                    <Heading size="lg">{texts['incomeHeader.title']}</Heading>
                    <Text>{texts['incomeHeader.description']}</Text>
                    <IncomeInput onConfirm={handleOnConfirm} />
                    <OtherCriteriaAccordion />
                </StyledVStack>
            </Box>
        </IncomeContext.Provider>
    )
}

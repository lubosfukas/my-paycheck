import { useMemo, useState } from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'

import { IncomeContext } from './IncomeContext'
import { IncomeInput } from './IncomeInput'
import { OtherCriteriaAccordion } from './OtherCriteriaAccordion'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

type Props = {
    onConfirm: ({
        monthlyGrossIncome,
        monthsWorked,
        isSeverelyDisabled,
        childrenBelowSix,
        childrenAboveSix,
    }: {
        monthlyGrossIncome: number
        monthsWorked: number
        isSeverelyDisabled: boolean
        childrenBelowSix: number
        childrenAboveSix: number
    }) => void
}

export const IncomeHeader = ({ onConfirm }: Props) => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)

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
        }),
        [
            childrenAboveSix,
            childrenBelowSix,
            isSeverelyDisabled,
            monthlyGrossIncome,
            monthsWorked,
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
        })

    return (
        <IncomeContext.Provider value={value}>
            <Box
                bg="white"
                m={isLargerThanTablet ? 'none' : '4'}
                p={isLargerThanTablet ? 16 : 8}
            >
                <VStack
                    align="stretch"
                    mx="auto"
                    maxW={isLargerThanLaptop ? '1024px' : '768px'}
                >
                    <Heading size="lg">
                        Zistite koľko by ste zarábali na živnosť alebo s.r.o.
                    </Heading>
                    <Text>
                        Tento nástroj vypočítava sumu, ktorú by ste mali
                        fakturovať, ak pracujete na živnosť alebo S.R.O. z TPP
                        tak, aby sa náklady zamestnávateľa nezvýšili.
                    </Text>
                    <IncomeInput onConfirm={handleOnConfirm} />
                    <OtherCriteriaAccordion />
                </VStack>
            </Box>
        </IncomeContext.Provider>
    )
}

import { forwardRef, useMemo, useState } from 'react'
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from './IncomeContext'
import { IncomeInput } from './IncomeInput'
import { OtherCriteriaAccordion } from './OtherCriteriaAccordion'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { OtherCriteriaModal } from './Mobile/OtherCriteriaModal'
import { RefType } from '../../types'

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

export const IncomeHeader = forwardRef<RefType, Props>(({ onConfirm }, ref) => {
    const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(0)
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)
    const [monthsWorked, setMonthsWorked] = useState(12)
    const [companionIncome, setCompanionIncome] = useState<number | undefined>()

    const { isOpen, onOpen, onClose } = useDisclosure()

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
                px={isLargerThanTablet ? 16 : 4}
                py={isLargerThanLaptop ? 16 : 6}
            >
                <StyledVStack
                    align="stretch"
                    mx="auto"
                    maxW={isLargerThanLaptop ? '1024px' : '768px'}
                >
                    <Heading size="xl">
                        Zistite koľko by ste zarábali na živnosť
                    </Heading>
                    <Text>
                        Tento nástroj vypočítava sumu, ktorú by ste mali
                        fakturovať, ak pracujete na živnosť z TPP tak, aby sa
                        náklady zamestnávateľa nezvýšili.
                    </Text>
                    <IncomeInput onConfirm={handleOnConfirm} />
                    {isLargerThanTablet ? (
                        <OtherCriteriaAccordion />
                    ) : (
                        <Button
                            colorScheme="green"
                            disabled={monthlyGrossIncome < 700}
                            onClick={onOpen}
                            variant="outline"
                            _active={{ borderColor: 'green.200' }}
                        >
                            Rozšírené zadanie
                        </Button>
                    )}
                </StyledVStack>
            </Box>
            <OtherCriteriaModal
                ref={ref}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleOnConfirm}
            />
        </IncomeContext.Provider>
    )
})

IncomeHeader.displayName = 'income-header'

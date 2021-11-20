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

const DEFAULT_CHILDREN_ABOVE_SIX = 0
const DEFAULT_CHILDREN_BELOW_SIX = 0
const DEFAULT_SEVERELY_DISABLED = false
const DEFAULT_COMPANION_INCOME: number | undefined = undefined

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
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(
        DEFAULT_SEVERELY_DISABLED
    )
    const [childrenBelowSix, setChildrenBelowSix] = useState(
        DEFAULT_CHILDREN_BELOW_SIX
    )
    const [childrenAboveSix, setChildrenAboveSix] = useState(
        DEFAULT_CHILDREN_ABOVE_SIX
    )
    const [monthsWorked, setMonthsWorked] = useState(12)
    const [companionIncome, setCompanionIncome] = useState<number | undefined>(
        DEFAULT_COMPANION_INCOME
    )

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

    const reset = () => {
        setChildrenAboveSix(DEFAULT_CHILDREN_ABOVE_SIX)
        setChildrenBelowSix(DEFAULT_CHILDREN_BELOW_SIX)
        setIsSeverelyDisabled(DEFAULT_SEVERELY_DISABLED)
        setCompanionIncome(DEFAULT_COMPANION_INCOME)
    }

    const handleConfirmed = () =>
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
                    <IncomeInput onConfirm={handleConfirmed} />
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
                onConfirm={handleConfirmed}
                reset={reset}
            />
        </IncomeContext.Provider>
    )
})

IncomeHeader.displayName = 'IncomeHeader'

import { forwardRef, useContext } from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeInput } from '../../common'
import { useMediaQuery } from '../../../hooks'
import { device } from '../../../utils/device'
import { RefType } from '../../../types'
import { ChildrenAboveSixInput } from './ChildrenAboveSixInput'
import { ChildrenBelowSixInput } from './ChildrenBelowSixInput'
import { ChildrenAboveFifteen } from './ChildrenAboveFifteen'
import { SeverelyDisabledSwitch } from './SeverelyDisabledSwitch'
import { CompanionIncomeInput } from './CompanionIncomeInput'
import { OtherCriteriaModal } from './OtherCriteriaModal'
import { IncomeContext } from '../../../IncomeContext'

const StyledVStack = styled(VStack)`
    > :last-child {
        margin-top: 1rem;
    }
`

type Props = {
    onConfirm: () => void
}

export const IncomeHeader = forwardRef<RefType, Props>(({ onConfirm }, ref) => {
    const { monthlyGrossIncome, setMonthlyGrossIncome } =
        useContext(IncomeContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const isLargerThanTablet = useMediaQuery(device.tablet)
    const isLargerThanLaptop = useMediaQuery(device.laptop)

    return (
        <header>
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
                    <Heading size="xl">Porovnanie TPP a živnosti</Heading>
                    <Text>
                        Tento nástroj vypočítava sumu, ktorú by ste mali
                        fakturovať, ak prechádzate na živnosť z TPP tak, aby sa
                        náklady zamestnávateľa nezvýšili.
                    </Text>
                    <Flex
                        flexDirection={isLargerThanTablet ? 'row' : 'column'}
                        justifyContent="space-between"
                    >
                        <IncomeInput
                            placeholder="Zadajte hrubý mesačný príjem (min. 700€)"
                            value={monthlyGrossIncome}
                            onChange={setMonthlyGrossIncome}
                        />
                        <>
                            <Button
                                disabled={monthlyGrossIncome < 700}
                                ml={isLargerThanTablet ? 4 : 0}
                                mt={isLargerThanTablet ? 0 : 4}
                                mb={isLargerThanTablet ? 0 : 4}
                                onClick={onConfirm}
                                px={8}
                            >
                                Vypočítať
                            </Button>
                            <Button
                                disabled={monthlyGrossIncome < 700}
                                ml={isLargerThanTablet ? 4 : 0}
                                onClick={onOpen}
                                variant="outline"
                                px={8}
                            >
                                Rozšírené zadanie
                            </Button>
                        </>
                    </Flex>
                </StyledVStack>
            </Box>
            <OtherCriteriaModal
                ref={ref}
                isOpen={isOpen}
                steps={5}
                onClose={onClose}
                onConfirm={onConfirm}
                renderSteps={(param: number) => {
                    switch (param) {
                        case 1:
                            return <CompanionIncomeInput />
                        case 2:
                            return <ChildrenBelowSixInput />
                        case 3:
                            return <ChildrenAboveSixInput />
                        case 4:
                            return <ChildrenAboveFifteen />
                        case 5:
                            return <SeverelyDisabledSwitch />
                        default:
                            return <div />
                    }
                }}
            />
        </header>
    )
})

IncomeHeader.displayName = 'IncomeHeader'

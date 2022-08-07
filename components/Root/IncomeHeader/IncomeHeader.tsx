import { Dispatch, forwardRef, SetStateAction, useContext } from 'react'
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

import { CompanionIncomeInput } from './CompanionIncomeInput'
import { device } from '../../../utils/device'
import { IncomeInput, NumberInput, OtherCriteriaModal } from '../../common'
import { Income, RefType } from '../../../types'
import { SeverelyDisabledSwitch } from './SeverelyDisabledSwitch'
import { useMediaQuery } from '../../../hooks'

const StyledVStack = styled(VStack)`
    > :last-child {
        margin-top: 1rem;
    }
`

type Props = Income & {
    onConfirm: () => void
    setChildrenAboveFifteen: Dispatch<
        SetStateAction<Income['childrenAboveFifteen']>
    >
    setChildrenAboveSix: Dispatch<SetStateAction<Income['childrenAboveSix']>>
    setChildrenBelowSix: Dispatch<SetStateAction<Income['childrenBelowSix']>>
    setCompanionIncome: Dispatch<SetStateAction<Income['companionIncome']>>
    setIsSeverelyDisabled: Dispatch<
        SetStateAction<Income['isSeverelyDisabled']>
    >
    setMonthlyGrossIncome: Dispatch<
        SetStateAction<Income['monthlyGrossIncome']>
    >
    setMonthsWorked: Dispatch<SetStateAction<Income['monthsWorked']>>
}

export const IncomeHeader = forwardRef<RefType, Props>(
    (
        {
            childrenAboveFifteen,
            childrenAboveSix,
            childrenBelowSix,
            companionIncome,
            isSeverelyDisabled,
            monthlyGrossIncome,
            onConfirm,
            setChildrenAboveFifteen,
            setChildrenAboveSix,
            setChildrenBelowSix,
            setCompanionIncome,
            setIsSeverelyDisabled,
            setMonthlyGrossIncome,
        },
        ref
    ) => {
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
                            fakturovať, ak prechádzate na živnosť z TPP tak, aby
                            sa náklady zamestnávateľa nezvýšili.
                        </Text>
                        <Flex
                            flexDirection={
                                isLargerThanTablet ? 'row' : 'column'
                            }
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
                                return (
                                    <CompanionIncomeInput
                                        value={companionIncome}
                                        onChange={setCompanionIncome}
                                    />
                                )
                            case 2:
                                return (
                                    <NumberInput
                                        label="Počet detí pod 6 rokov (vrátane)"
                                        value={childrenBelowSix}
                                        setValue={setChildrenBelowSix}
                                    />
                                )
                            case 3:
                                return (
                                    <NumberInput
                                        label="Počet detí vo veku od 6 do 15 rokov"
                                        value={childrenAboveSix}
                                        setValue={setChildrenAboveSix}
                                    />
                                )
                            case 4:
                                return (
                                    <NumberInput
                                        label="Počet detí nad 15 rokov"
                                        value={childrenAboveFifteen}
                                        setValue={setChildrenAboveFifteen}
                                    />
                                )
                            case 5:
                                return (
                                    <SeverelyDisabledSwitch
                                        value={isSeverelyDisabled}
                                        onChange={setIsSeverelyDisabled}
                                    />
                                )
                            default:
                                return <div />
                        }
                    }}
                />
            </header>
        )
    }
)

IncomeHeader.displayName = 'IncomeHeader'

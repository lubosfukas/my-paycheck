import { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    VStack,
} from '@chakra-ui/react'

import OtherCriteria from './OtherCriteria'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

type Props = {
    onChange: (
        income: number,
        isSeverelyDisabled: boolean,
        childrenBelowSix: number,
        childrenAboveSix: number
    ) => void
}

const IncomeInput = ({ onChange }: Props) => {
    const [income, setIncome] = useState('')
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)
    const [childrenBelowSix, setChildrenBelowSix] = useState(0)
    const [childrenAboveSix, setChildrenAboveSix] = useState(0)

    const isLargerThanTablet = useMediaQuery(device.tablet)

    const isInvalid = parseInt(income) < 700

    return (
        <Box bg="white" p={isLargerThanTablet ? 16 : 4}>
            <VStack align="stretch" mx="auto" maxW="1024px">
                <Heading size={isLargerThanTablet ? 'lg' : 'md'}>
                    Zistite koľko by ste zarábali na živnosť alebo s.r.o.
                </Heading>
                <Text>
                    Tento nástroj vypočítava sumu, ktorú by ste mali fakturovať,
                    ak pracujete na živnosť alebo S.R.O. z TPP tak, aby sa
                    náklady zamestnávateľa nezvýšili.
                </Text>
                <Flex flexDirection={isLargerThanTablet ? 'row' : 'column'}>
                    <InputGroup maxW="md">
                        <InputLeftElement color="gray.400" pointerEvents="none">
                            €
                        </InputLeftElement>
                        <Input
                            focusBorderColor="green.200"
                            isInvalid={isInvalid}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setIncome(event.target.value)}
                            placeholder="Zadajte svoj hrubý mesačný príjem (min. 700€)"
                            type="number"
                            value={income}
                        />
                    </InputGroup>
                    <Button
                        colorScheme="green"
                        disabled={!income || isInvalid}
                        ml={isLargerThanTablet ? 4 : 0}
                        mt={isLargerThanTablet ? 0 : 4}
                        onClick={() =>
                            onChange(
                                parseInt(income),
                                isSeverelyDisabled,
                                childrenBelowSix,
                                childrenAboveSix
                            )
                        }
                        _active={{ borderColor: 'green.200' }}
                    >
                        Vypočítať
                    </Button>
                </Flex>
                <OtherCriteria
                    isSeverelyDisabled={isSeverelyDisabled}
                    childrenBelowSix={childrenBelowSix}
                    childrenAboveSix={childrenAboveSix}
                    onChangeSeverelyDisabled={setIsSeverelyDisabled}
                    onChangeChildrenBelowSix={setChildrenBelowSix}
                    onChangeChildrenAboveSix={setChildrenAboveSix}
                />
            </VStack>
        </Box>
    )
}

export default IncomeInput

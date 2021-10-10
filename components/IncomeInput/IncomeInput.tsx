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

import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

type Props = {
    onChange: (newValue: string) => void
}

const IncomeInput = ({ onChange }: Props) => {
    const [value, setValue] = useState('')
    const isLargerThanTablet = useMediaQuery(device.tablet)
    const isInvalid = parseInt(value) < 700

    return (
        <Box bg="white" p={isLargerThanTablet ? 16 : 4}>
            <VStack align="stretch" mx="auto" maxW="1024px">
                <Heading size={isLargerThanTablet ? 'lg' : 'md'}>
                    Zistite koľko by ste zarábali na živnosť alebo s.r.o.
                </Heading>
                <Flex flexDirection={isLargerThanTablet ? 'row' : 'column'}>
                    <InputGroup maxW="xs">
                        <InputLeftElement color="gray.400" pointerEvents="none">
                            €
                        </InputLeftElement>
                        <Input
                            focusBorderColor="green.200"
                            isInvalid={isInvalid}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setValue(event.target.value)}
                            placeholder="Zadajte svoj hrubý mesačný príjem (min. 700€)"
                            type="number"
                            value={value}
                        />
                    </InputGroup>
                    <Button
                        colorScheme="green"
                        disabled={isInvalid}
                        ml={isLargerThanTablet ? 4 : 0}
                        mt={isLargerThanTablet ? 0 : 4}
                        onClick={() => onChange(value)}
                        _active={{ borderColor: 'green.200' }}
                    >
                        Vypočítať
                    </Button>
                </Flex>
                <Text fontSize="sm">
                    Tento nástroj vypočítava sumu, ktorú by ste mali fakturovať,
                    ak pracujete na živnosť alebo S.R.O. z TPP tak, aby sa
                    náklady zamestnávateľa nezvýšili.
                </Text>
            </VStack>
        </Box>
    )
}

export default IncomeInput

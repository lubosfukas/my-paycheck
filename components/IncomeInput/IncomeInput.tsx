import { useState } from 'react'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    VStack,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

type Props = {
    onChange: (income: string, isSeverelyDisabled: boolean) => void
}

const IncomeInput = ({ onChange }: Props) => {
    const [income, setIncome] = useState('')
    const [isSeverelyDisabled, setIsSeverelyDisabled] = useState(false)

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
                    <InputGroup maxW="xs">
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
                        disabled={isInvalid}
                        ml={isLargerThanTablet ? 4 : 0}
                        mt={isLargerThanTablet ? 0 : 4}
                        onClick={() => onChange(income, isSeverelyDisabled)}
                        _active={{ borderColor: 'green.200' }}
                    >
                        Vypočítať
                    </Button>
                </Flex>
                <Accordion allowToggle>
                    <StyledAccordionItem>
                        <AccordionButton pl="0">
                            <Box>Ďalšie kritéria</Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pl="0">
                            <Checkbox
                                colorScheme="green"
                                isChecked={isSeverelyDisabled}
                                onChange={() =>
                                    setIsSeverelyDisabled(!isSeverelyDisabled)
                                }
                            >
                                ZŤP
                            </Checkbox>
                        </AccordionPanel>
                    </StyledAccordionItem>
                </Accordion>
            </VStack>
        </Box>
    )
}

export default IncomeInput

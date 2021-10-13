import { useState } from 'react'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    HStack,
    Input,
    Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

type Props = {
    isSeverelyDisabled: boolean
    childrenBelowSix: number
    childrenAboveSix: number
    onChangeSeverelyDisabled: (isSeverelyDisabled: boolean) => void
    onChangeChildrenBelowSix: (childrenBelowSix: number) => void
    onChangeChildrenAboveSix: (childrenAboveSix: number) => void
}

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

const NumberInput = ({
    label,
    value: defaultValue,
    onChange,
}: {
    label: string
    value: number
    onChange: (newValue: number) => void
}) => {
    const [value, setValue] = useState(defaultValue.toString())

    return (
        <HStack>
            <Input
                focusBorderColor="green.200"
                maxW="16"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(event.target.value)
                }
                onBlur={() => {
                    if (!value) {
                        setValue('0')
                        onChange(0)
                    } else onChange(parseInt(value))
                }}
                size="sm"
                type="number"
                value={value}
            />
            <Text>{label}</Text>
        </HStack>
    )
}

const OtherCriteria = ({
    isSeverelyDisabled,
    childrenBelowSix,
    childrenAboveSix,
    onChangeSeverelyDisabled,
    onChangeChildrenBelowSix,
    onChangeChildrenAboveSix,
}: Props) => {
    return (
        <Accordion allowToggle>
            <StyledAccordionItem id="other-criteria">
                <AccordionButton pl="0">
                    <Box>Ďalšie kritéria</Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pl="0">
                    <HStack spacing="8">
                        <Checkbox
                            colorScheme="green"
                            isChecked={isSeverelyDisabled}
                            onChange={() =>
                                onChangeSeverelyDisabled(!isSeverelyDisabled)
                            }
                        >
                            ZŤP
                        </Checkbox>
                        <NumberInput
                            label="Deti pod 6 rokov (vrátane)"
                            value={childrenBelowSix}
                            onChange={onChangeChildrenBelowSix}
                        />
                        <NumberInput
                            label="Deti nad 6 rokov"
                            value={childrenAboveSix}
                            onChange={onChangeChildrenAboveSix}
                        />
                    </HStack>
                </AccordionPanel>
            </StyledAccordionItem>
        </Accordion>
    )
}

export default OtherCriteria

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    HStack,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

import NumberInput from './NumberInput'

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

type Props = {
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    onChangeChildrenAboveSix: (childrenAboveSix: number) => void
    onChangeChildrenBelowSix: (childrenBelowSix: number) => void
    onChangeSeverelyDisabled: (isSeverelyDisabled: boolean) => void
}

const OtherCriteria = ({
    childrenAboveSix,
    childrenBelowSix,
    isSeverelyDisabled,
    onChangeChildrenAboveSix,
    onChangeChildrenBelowSix,
    onChangeSeverelyDisabled,
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
                            defaultValue={childrenBelowSix}
                            label="Deti pod 6 rokov (vrátane)"
                            onChange={onChangeChildrenBelowSix}
                        />
                        <NumberInput
                            defaultValue={childrenAboveSix}
                            label="Deti nad 6 rokov"
                            onChange={onChangeChildrenAboveSix}
                        />
                    </HStack>
                </AccordionPanel>
            </StyledAccordionItem>
        </Accordion>
    )
}

export default OtherCriteria

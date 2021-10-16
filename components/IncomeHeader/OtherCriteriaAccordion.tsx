import { useContext } from 'react'
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

import { IncomeContext } from './IncomeContext'
import { NumberInput } from '..'

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

export const OtherCriteriaAccordion = () => {
    const {
        childrenAboveSix,
        setChildrenAboveSix,
        childrenBelowSix,
        setChildrenBelowSix,
        isSeverelyDisabled,
        setIsSeverelyDisabled,
    } = useContext(IncomeContext)

    const handleCheckboxOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setIsSeverelyDisabled(event.currentTarget.checked)

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
                            defaultChecked={isSeverelyDisabled}
                            onChange={handleCheckboxOnChange}
                        >
                            ZŤP
                        </Checkbox>
                        <NumberInput
                            defaultValue={childrenBelowSix}
                            label="Deti pod 6 rokov (vrátane)"
                            min={0}
                            onChange={setChildrenBelowSix}
                        />
                        <NumberInput
                            defaultValue={childrenAboveSix}
                            label="Deti nad 6 rokov"
                            min={0}
                            onChange={setChildrenAboveSix}
                        />
                    </HStack>
                </AccordionPanel>
            </StyledAccordionItem>
        </Accordion>
    )
}

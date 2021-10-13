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

import { IncomeContext } from '../context'
import { ChildrenInput } from './ChildrenInput'

const StyledAccordionItem = styled(AccordionItem)`
    border: none;
`

export const OtherCriteria = () => {
    const {
        childrenAboveSix,
        setChildrenAboveSix,
        childrenBelowSix,
        setChildrenBelowSix,
        isSeverelyDisabled,
        setIsSeverelyDisabled,
    } = useContext(IncomeContext)

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
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                setIsSeverelyDisabled(
                                    event.currentTarget.checked
                                )
                            }
                        >
                            ZŤP
                        </Checkbox>
                        <ChildrenInput
                            defaultValue={childrenBelowSix}
                            label="Deti pod 6 rokov (vrátane)"
                            onChange={setChildrenBelowSix}
                        />
                        <ChildrenInput
                            defaultValue={childrenAboveSix}
                            label="Deti nad 6 rokov"
                            onChange={setChildrenAboveSix}
                        />
                    </HStack>
                </AccordionPanel>
            </StyledAccordionItem>
        </Accordion>
    )
}

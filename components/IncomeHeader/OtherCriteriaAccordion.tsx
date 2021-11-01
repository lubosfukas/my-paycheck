import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

import { ChildrenAboveSixInput } from './ChildrenAboveSixInput'
import { ChildrenBelowSixInput } from './ChildrenBelowSixInput'
import { CompanionIncomeInput } from './CompanionIncomeInput'
import { SeverelyDisabledSwitch } from './SeverelyDisabledSwitch'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { texts } from '../../utils/texts'

const StyledFlex = styled(Flex)`
    > * {
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    > :last-child {
        margin-bottom: 0;
        margin-right: 0;
    }
`

export const OtherCriteriaAccordion = () => {
    const isLargerThanTablet = useMediaQuery(device.tablet)

    return (
        <Accordion allowToggle>
            <AccordionItem id="other-criteria">
                <AccordionButton pl="0" _expanded={{ fontWeight: 'bold' }}>
                    {texts['otherCriteriaAccordion.label']}
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pl="0" pb="4">
                    <StyledFlex
                        alignItems={isLargerThanTablet ? 'center' : 'start'}
                        direction={isLargerThanTablet ? 'row' : 'column'}
                        wrap={isLargerThanTablet ? 'wrap' : 'nowrap'}
                    >
                        <ChildrenBelowSixInput />
                        <ChildrenAboveSixInput />
                        <SeverelyDisabledSwitch />
                        <CompanionIncomeInput />
                    </StyledFlex>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

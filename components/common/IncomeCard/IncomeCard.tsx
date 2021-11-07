import { forwardRef } from 'react'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'

import { IncomeSection } from './IncomeSection'
import { useMediaQuery } from '../../../hooks'
import { device } from '../../../utils/device'
import { RefType } from '../../../types'

type Props = {
    content: Array<{
        label: string
        value: number
        cash?: boolean
        colored?: boolean
    }>
    title: string
    additional?: Array<{ id: string; label: string; content: React.ReactNode }>
    description?: string
}

export const IncomeCard = forwardRef<RefType, Props>(
    ({ content, title, additional, description }, ref) => {
        const isLargerThanTablet = useMediaQuery(device.tablet)
        const isLargerThanLaptop = useMediaQuery(device.laptop)

        return (
            <Box
                ref={ref}
                bg="white"
                borderRadius="lg"
                my={isLargerThanLaptop ? '8' : '4'}
                mx={isLargerThanTablet ? 'auto' : '4'}
                maxW={isLargerThanLaptop ? '1024px' : '768px'}
                p={isLargerThanTablet ? '16' : '8'}
            >
                <Heading mb="2" size="lg">
                    {title}
                </Heading>
                {description && <Text>{description}</Text>}
                <Flex
                    direction={isLargerThanTablet ? 'row' : 'column'}
                    my="6"
                    wrap={isLargerThanTablet ? 'wrap' : 'nowrap'}
                >
                    {content.map((x) => (
                        <IncomeSection
                            key={`${x.label}-${x.value}`}
                            label={x.label}
                            value={x.value}
                            cash={x.cash}
                            colored={x.colored}
                        />
                    ))}
                </Flex>
                {additional && (
                    <Accordion
                        allowMultiple={additional.length > 1}
                        allowToggle={additional.length === 1}
                    >
                        {additional.map((x) => (
                            <AccordionItem key={x.id} id={x.id}>
                                <AccordionButton
                                    pl="0"
                                    _expanded={{ fontWeight: 'bold' }}
                                >
                                    <Box>{x.label}</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pl="0">
                                    {x.content}
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </Box>
        )
    }
)

IncomeCard.displayName = 'IncomeCard'

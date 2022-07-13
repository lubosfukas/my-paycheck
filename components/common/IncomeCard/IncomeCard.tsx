import { forwardRef, RefObject } from 'react'
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
    additional?: Array<{
        id: string
        label: string
        content: React.ReactNode
    }>
    description?: string
}

export const IncomeCard = forwardRef<RefType, Props>(
    ({ content, title, additional, description }, ref) => {
        const isLargerThanTablet = useMediaQuery(device.tablet)
        const isLargerThanLaptop = useMediaQuery(device.laptop)

        return (
            <Box
                ref={ref as RefObject<HTMLDivElement>}
                bg="white"
                borderRadius="lg"
                my={isLargerThanLaptop ? 8 : 6}
                mx={isLargerThanTablet ? 'auto' : '4'}
                maxW={isLargerThanLaptop ? '1024px' : '768px'}
                px={isLargerThanTablet ? 16 : 4}
                py={isLargerThanTablet ? 16 : 6}
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
                    {content.map(({ cash, colored, label, value }) => (
                        <IncomeSection
                            key={`${label}-${value}`}
                            label={label}
                            value={value}
                            cash={cash}
                            colored={colored}
                        />
                    ))}
                </Flex>
                {additional && (
                    <Accordion
                        allowMultiple={additional.length > 1}
                        allowToggle={additional.length === 1}
                    >
                        {additional.map(({ content, id, label }) => (
                            <AccordionItem key={id} id={id}>
                                <AccordionButton
                                    pl="0"
                                    _expanded={{ fontWeight: 'bold' }}
                                >
                                    <Box>{label}</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pl="0">
                                    {content}
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

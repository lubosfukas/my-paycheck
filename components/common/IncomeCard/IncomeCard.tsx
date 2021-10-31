import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import { IncomeSection } from './IncomeSection'
import { useMediaQuery } from '../../../hooks'
import { device } from '../../../utils/device'

type Props = {
    title: string
    description?: string
    content: Array<{
        label: string
        value: number
        cash: boolean
        colored: boolean
    }>
    additional?: React.ReactNode
}

export const IncomeCard = ({
    title,
    description,
    content,
    additional,
}: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)
    const isLargerThanLaptop = useMediaQuery(device.laptop)

    return (
        <Box
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
            {additional}
        </Box>
    )
}

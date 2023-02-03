import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { device } from '../../utils/device'
import { useMediaQuery } from '../../hooks'

const StyledVStack = styled(VStack)`
    > :last-child {
        margin-top: 1rem;
    }
`

type Props = {
    actions: JSX.Element
    description: string
    modal: JSX.Element
    title: string
}

export const IncomeHeader = ({ actions, description, modal, title }: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)
    const isLargerThanLaptop = useMediaQuery(device.laptop)

    return (
        <header>
            <Box
                bg="white"
                px={isLargerThanTablet ? 12 : 4}
                py={isLargerThanLaptop ? 12 : 6}
            >
                <StyledVStack
                    align="stretch"
                    mx="auto"
                    maxW={isLargerThanLaptop ? '1024px' : '768px'}
                >
                    <Heading size="xl">{title}</Heading>
                    <Text>{description}</Text>
                    <Flex
                        flexDirection={isLargerThanTablet ? 'row' : 'column'}
                        justifyContent="space-between"
                    >
                        {actions}
                    </Flex>
                </StyledVStack>
            </Box>
            {modal}
        </header>
    )
}

IncomeHeader.displayName = 'IncomeHeader'

import NextLink from 'next/link'
import {
    Box,
    Divider,
    IconButton,
    Link,
    Stack,
    useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'

import { useMediaQuery, usePageYOffset } from '../../../hooks'
import { device } from '../../../utils/device'
import { Drawer } from './Drawer'

const StyledNav = styled.nav`
    position: sticky;
    top: 0;
    z-index: 3;
    box-shadow: ${({ scrolled }: { scrolled: boolean }) =>
        scrolled && '0px 3px 6px rgba(0, 0, 0, 0.1)'};
`

export const Navigation = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const isLargerThanLaptop = useMediaQuery(device.laptop)
    const isLargerThanTablet = useMediaQuery(device.tablet)
    const yOffset = usePageYOffset()

    const scrolled = yOffset !== 0

    return (
        <StyledNav scrolled={scrolled}>
            <Box backgroundColor="white">
                <Box
                    backgroundColor="white"
                    maxW={isLargerThanLaptop ? '1024px' : '768px'}
                    mx={isLargerThanTablet ? 'auto' : '4'}
                >
                    <Stack
                        direction="row-reverse"
                        py={isLargerThanLaptop ? 4 : 1}
                        spacing={10}
                    >
                        {isLargerThanTablet ? (
                            <>
                                <Link as={NextLink} href="/zivnost">
                                    Živnosť
                                </Link>
                                <Link as={NextLink} href="/">
                                    Porovnanie TPP a živnosti
                                </Link>
                            </>
                        ) : (
                            <IconButton
                                aria-label="Open drawer"
                                icon={<HamburgerIcon />}
                                variant="ghost"
                                onClick={onOpen}
                            />
                        )}
                    </Stack>
                    {!scrolled && <Divider />}
                </Box>
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} />
        </StyledNav>
    )
}

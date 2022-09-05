import NextLink from 'next/link'
import { Box, Divider, Link, Stack, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { useMediaQuery, usePageYOffset } from '../../../hooks'
import { device } from '../../../utils/device'
import { Drawer } from './Drawer'

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
`

const StyledLink = styled(Link)`
    font-size: 17px;
`

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
                        py={isLargerThanLaptop ? 8 : 6}
                        spacing={10}
                    >
                        {isLargerThanTablet ? (
                            <>
                                <NextLink href="/zivnost" passHref>
                                    <StyledLink>Živnosť</StyledLink>
                                </NextLink>
                                <NextLink href="/" passHref>
                                    <StyledLink>Porovnanie</StyledLink>
                                </NextLink>
                            </>
                        ) : (
                            <StyledIcon icon={faBars} onClick={onOpen} />
                        )}
                    </Stack>
                    {!scrolled && <Divider />}
                </Box>
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} />
        </StyledNav>
    )
}
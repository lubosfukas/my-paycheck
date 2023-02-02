import NextLink from 'next/link'
import {
    Divider,
    DrawerBody,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Link,
    Stack,
    Drawer as DrawerChakra,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

const StyledLink = styled(Link)`
    font-weight: 500;
`

export const Drawer = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) => (
    <DrawerChakra isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
                <>
                    <Divider />
                    <Stack direction="column" py={6} spacing={5}>
                        <StyledLink as={NextLink} href="/">
                            Porovnanie TPP a živnosti
                        </StyledLink>
                        <StyledLink as={NextLink} href="/zivnost">
                            Živnosť
                        </StyledLink>
                    </Stack>
                </>
            </DrawerBody>
        </DrawerContent>
    </DrawerChakra>
)

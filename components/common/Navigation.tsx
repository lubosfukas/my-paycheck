import { Box, Divider, Link, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

export const Navigation = () => {
    const isLargerThanLaptop = useMediaQuery(device.laptop)
    const isLargerThanTablet = useMediaQuery(device.tablet)

    return (
        <nav>
            <Box backgroundColor="white">
                <Box
                    backgroundColor="white"
                    maxW={isLargerThanLaptop ? '1024px' : '768px'}
                    mx={isLargerThanTablet ? 'auto' : '4'}
                >
                    <Stack
                        direction="row-reverse"
                        py={isLargerThanLaptop ? 8 : 6}
                        spacing={8}
                    >
                        <NextLink href="/zivnost" passHref>
                            <Link>Živnosť</Link>
                        </NextLink>
                        <NextLink href="/" passHref>
                            <Link>Porovnanie</Link>
                        </NextLink>
                    </Stack>
                    <Divider />
                </Box>
            </Box>
        </nav>
    )
}

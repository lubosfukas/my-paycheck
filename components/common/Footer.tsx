import { Box, Stack, Text } from '@chakra-ui/react'

import { device } from '../../utils/device'
import { useMediaQuery } from '../../hooks'

export const Footer = () => {
    const isLargerThanLaptop = useMediaQuery(device.laptop)
    const isLargerThanTablet = useMediaQuery(device.tablet)

    return (
        <Box
            backgroundColor="blackAlpha.800"
            mt={isLargerThanTablet ? '8' : '2'}
        >
            <Box
                maxW={isLargerThanLaptop ? '1024px' : '768px'}
                mx={isLargerThanTablet ? 'auto' : '4'}
            >
                <Stack
                    alignItems="center"
                    py={isLargerThanLaptop ? 4 : 2}
                    spacing={10}
                >
                    <Text
                        color="white"
                        fontSize={isLargerThanTablet ? 'smaller' : 'small'}
                    >
                        Ing. Ľuboš Fukas © 2023
                    </Text>
                </Stack>
            </Box>
        </Box>
    )
}

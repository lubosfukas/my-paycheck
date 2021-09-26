import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
        global: () => ({
            'html, body': {
                margin: 0,
                padding: 0,
                backgroundColor: 'gray.100',
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
            },
            a: {
                color: 'inherit',
                textDecoration: 'none',
            },
            '*': {
                boxSizing: 'border-box',
            },
        }),
    },
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}
export default MyApp

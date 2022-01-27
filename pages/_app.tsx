import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import 'focus-visible/dist/focus-visible'

const theme = extendTheme({
    components: {
        Switch: {
            baseStyle: {
                track: {
                    _focus: {
                        boxShadow: 'none',
                    },
                },
            },
        },
    },
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
            'js-focus-visible :focus:not([data-focus-visible-added])': {
                outline: 'none',
                boxShadow: 'none',
            },
        }),
    },
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Kalkulačka živnosť</title>
            </Head>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    )
}
export default MyApp

import type { AppProps } from 'next/app'
import Head from 'next/head'
import {
    ChakraProvider,
    extendTheme,
    withDefaultColorScheme,
} from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'focus-visible/dist/focus-visible'

config.autoAddCss = false

const theme = extendTheme(
    withDefaultColorScheme({
        colorScheme: 'green',
        components: ['Button', 'Switch'],
    }),
    {
        components: {
            Button: {
                baseStyle: {
                    track: {
                        _active: {
                            borderColor: 'green.200',
                        },
                    },
                },
            },
            Input: {
                defaultProps: {
                    focusBorderColor: 'green.200',
                },
            },
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
    }
)

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

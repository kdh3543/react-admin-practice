import type { AppProps } from 'next/app'
import { ChakraProvider, Box, useColorModeValue } from '@chakra-ui/react'
import Toolbar from '../components/Toolbar'
import { Provider } from 'react-redux'
import store from '../components/hooks/store/store'
import HeadSelect from '../components/HeadSelect'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <HeadSelect />
        <Toolbar />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )

}

export default MyApp

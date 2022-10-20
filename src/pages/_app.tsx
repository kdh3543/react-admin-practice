import type { AppProps } from 'next/app'
import { ChakraProvider, Box, useColorModeValue } from '@chakra-ui/react'
import Toolbar from '../components/Toolbar'
import { Provider } from 'react-redux'
import store from '../components/hooks/store/store'
import MenuDropDown from '../components/MenuDropDown'
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <Provider store={store}>
          <MenuDropDown />
          <Toolbar />
          <Component {...pageProps} />
        </Provider>
      </CookiesProvider>
    </ChakraProvider>
  )

}

export default MyApp

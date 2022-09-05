import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Toolbar from '../components/Toolbar'
import { Provider } from 'react-redux'
import store from '../components/hooks/store/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        < Toolbar />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )

}

export default MyApp

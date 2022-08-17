import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Toolbar from '../components/Toolbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
       <Toolbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
  
}

export default MyApp

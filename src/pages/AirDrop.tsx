import { Container, Flex, Box } from '@chakra-ui/react'
import { useState } from 'react'
export default function AirDrop() {
  const [list, setList] = useState<any>()
  // const [page]

  // const getAirDropList = async () => {
  //   try {
  //     const res = await getDropLists(page)
  //   }
  // }

  return (
    <Container
      maxW={'1200px'}
      mx={'auto'}
      mt={'40px'}
    >
      airdrop
      <Flex>
        <Box border={'1px solid black'}>
          test
        </Box>
      </Flex>
      
    </Container>
  )
}
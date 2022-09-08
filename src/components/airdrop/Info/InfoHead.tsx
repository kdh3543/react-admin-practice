import { Box } from "@chakra-ui/react"

export default function InfoHead() {
  return (
    <>
      <Box display={'flex'} textAlign={'center'} mb={'10px'}>
          <Box w={'10%'}>Id</Box>
          <Box w={'10%'}>Main Net</Box>
          <Box w={'30%'}>Public Key</Box>
          <Box w={'10%'}>State</Box>
          <Box w={'10%'}>Token Id</Box>
          <Box w={'10%'}>Amount</Box>
          <Box w={'20%'}>TX Hash</Box>
        </Box>
    </>
  )
}
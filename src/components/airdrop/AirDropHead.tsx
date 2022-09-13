import { Box, Button, Flex } from '@chakra-ui/react'
export default function AirDropHead(props:any) {
  return (
    <>
      <Box textAlign={'right'}>
        <Button
          size={'sm'}
          borderRadius={'10px'}
          colorScheme='purple'
          onClick={() => props.openRegister()}
        >
          Register
        </Button>
      </Box>
      <Flex textAlign={'center'} mt={'10px'} mb={'10px'}>
        <Box w={'5%'}>Id</Box>
        <Box w={'20%'}>Title</Box>
        <Box w={'15%'}>Contract</Box>
        <Box w={'10%'}>Target Count</Box>
        <Box w={'25%'}>Created At</Box>
        <Box w={'10%'}>State</Box>
        <Box w={'15%'}>Delete</Box>
      </Flex>
    </>
  )
}
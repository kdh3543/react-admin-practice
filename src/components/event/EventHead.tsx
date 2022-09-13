import { Box, Flex, Button } from '@chakra-ui/react'
export default function EventHead(props:any) {
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
        <Box w={'10%'}>Id</Box>
        <Box w={'15%'}>Type</Box>
        <Box w={'15%'}>SubType</Box>  
        <Box w={'10%'}>Active</Box>  
        <Box w={'20%'}>StartAt</Box> 
        <Box w={'20%'}>EndAt</Box>
        <Box w={'10%'}>Delete</Box>
      </Flex>
    </>
  )
}
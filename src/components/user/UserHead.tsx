import { Box } from '@chakra-ui/react'
export default function UserHead() {
  return (
    <>
      <Box w={'10%'}>Id</Box>
      <Box w={'30%'}>Address</Box>
      <Box w={'20%'}>CreatedAt</Box>  
      <Box w={'20%'}>DroppedAt</Box> 
      <Box w={'20%'}>UpdatedAt</Box> 
    </>
  )
}
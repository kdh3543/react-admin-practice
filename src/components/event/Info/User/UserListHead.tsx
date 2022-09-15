import { Box } from '@chakra-ui/react'
export default function UserListHead() {
  return (
    <>
      <Box w={'10%'}>Id</Box>
      <Box w={'20%'}>Address</Box>
      <Box w={'10%'}>Condition</Box>  
      <Box w={'10%'}>Status</Box>  
      <Box w={'20%'}>CreatedAt</Box> 
      <Box w={'20%'}>UpdatedAt</Box> 
      <Box w={'20%'}>DeletedAt</Box>
    </>
  )
}
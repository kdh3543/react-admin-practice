import { Box } from '@chakra-ui/react'
export default function AdminHead() {
  return (
    <>
      <Box w={'10%'}>Id</Box>
      <Box w={'20%'}>Email</Box>
      <Box w={'20%'}>CreatedAt</Box>  
      <Box w={'20%'}>ActivatedAt</Box>  
      <Box w={'15%'}>Roles</Box> 
      <Box w={'15%'}>Activated</Box> 
    </>
  )
}
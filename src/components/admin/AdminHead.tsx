import { Box } from '@chakra-ui/react'
export default function AdminHead() {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      h={'60px'}
      textAlign={'center'}
      borderRadius={'15px'}
      border={'1px solid black'}
    >
      <Box
        w={'10%'}
      >
        id
      </Box>
      <Box
        w={'20%'}
      >
        email
      </Box>
      <Box w={'20%'}>
        createdAt
      </Box>  
      <Box w={'20%'}>
        activatedAt
      </Box>  
      <Box w={'20%'}>
        deletedAt
      </Box>  
      <Box w={'10%'}>
        roles
      </Box>  
    </Box>
  )
}
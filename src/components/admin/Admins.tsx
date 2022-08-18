import { Box } from '@chakra-ui/react'
export default function Admins(props:any) {
  // const [data, setData] = use
  return (
    <>
      {props.adminData.map((data:any, index:Number) => (
        <Box
          key={data.id}
          display={'flex'}
          alignItems={'center'}
          borderRadius={'15px'}
          p={3}
          mt={2}
          border={'1px solid black'}
          textAlign={'center'}
          cursor={'pointer'}
        >
          <Box w={'10%'}>
            {data.id}
          </Box>
          <Box w={'20%'}>
            {data.email}
          </Box>
          <Box w={'20%'}>
            {data.updatedAt}
          </Box>
          <Box w={'20%'}>
            {data.createdAt}
          </Box>
          <Box w={'20%'}>
            {data.deletedAt ? data.deletedAt : 'null'}
          </Box>
          <Box w={'10%'}>
            {data.roles}
          </Box>
        </Box>
      ))}
    </>
  )
}
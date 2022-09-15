import { Box,Button } from '@chakra-ui/react'
import { useRouter } from "next/router";

export default function UserListBody(props: any) {
  return (
    <Box mt={3}>
      {props.userData.map((data:any, index:Number) => (
        <Box
          key={data.id}
          display={'flex'}
          alignItems={'center'}
          borderRadius={'15px'}
          p={2}
          mt={2}
          border={'1px solid black'}
          textAlign={'center'}
          cursor={'pointer'}
          fontSize={'13px'}
        >
          <Box w={'10%'}>{data.id}</Box>
          <Box w={'20%'} overflowX={'hidden'}>{data.address}</Box>
          <Box w={'10%'}>{data.condition}</Box>
          <Box w={'10%'}>{data.status}</Box>
          <Box w={'20%'}>{data.createdAt}</Box>
          <Box w={'20%'}>{data.updatedAt}</Box>
          <Box w={'20%'}>{data.deletedAt ? data.deletedAt : 'null'}</Box>
        </Box>
      ))}
    </Box>
  )
}
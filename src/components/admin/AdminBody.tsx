import { Box } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from "next/router";
import { getCookie,setCookie } from '../../utils/cookie';


export default function Admins(props: any) {
  // console.log(getCookie('myToken'))
  const router = useRouter()
  const openAdminInfor = (id:any) => {
    router.push({
      pathname: `/adminInfo/${id}`,
      query: {
        id
      }
    },`/adminInfo/${id}`)
  }
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
          onClick={() => { openAdminInfor(data.id) }}
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
import { Box } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from "next/router";
import { getCookie } from '../../utils/cookie';


export default function Admins(props: any) {
  axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwODk3NzY2LCJleHAiOjE2NjM0ODk3NjZ9.cMs3ECnAfpNLzrxUSP_joTLSgvWuEywVsdq2xrKwmr0`
  // const [data, setData] = use
  // const cook = getCookie('token')
  // axios.defaults.headers.common['Authorization'] = `Bearer ${cook}`
  const router = useRouter()
  const openAdminInfor = (id:any) => {
    router.push({
      pathname: `/adminInfo/${id}`,
      query: {
        id
      }
    },`/adminInfo/${id}`)
  }
  // console.log(axios.defaults.headers.common['Authorization'])
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
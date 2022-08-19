import axios from 'axios'

import { Key, useEffect, useState } from 'react'
// import { setToken, getToken } from '../localStorage/token'
import { Cookies } from 'react-cookie'
import { Box, Container } from '@chakra-ui/react'
import Pagination from "react-js-pagination";

const cookies = new Cookies()

cookies.set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
const token = cookies.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default function Signup() {
  const [admin, setAdmin] = useState<any>([])

  const [page, setPage] = useState(1)

  const getAdmins = async () => {
    try {
      const res = await axios.get(`https://dev-admin.luxon.run/admin/user?order=ASC&page=${page}&take=10`)
      setAdmin(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAdmins()
  },[page])

  const handlePageChange = (page:any) => {
    console.log(page);
    setPage(page)
  }
  return (
    <>
      <Container
        maxW={'1200px'}
        mx={'auto'}
        mt={'40px'}
        fontSize={'14px'}
      >
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
        {admin.map((data:any, index:Number) => (
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
      </Container>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </>

  )
}
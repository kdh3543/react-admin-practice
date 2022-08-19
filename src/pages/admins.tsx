import axios from 'axios'

import { Key, useEffect, useState } from 'react'
// import { setToken, getToken } from '../localStorage/token'
import { Cookies,useCookies } from 'react-cookie'
import { Container, Flex } from '@chakra-ui/react'
import Pagination from "react-js-pagination";
import Admins from '../components/admin/Admins';
import AdminHead from '../components/admin/AdminHead';
import PaginationFunc from "../components/utils/PaginationFunc";

// eslint-disable-next-line react-hooks/rules-of-hooks
const cookies = new Cookies()
cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
const token = cookies.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default function Signup() {
  const [admin, setAdmin] = useState<any>([])
  const [page, setPage] = useState(1)
  const [dataLength, setDataLength] = useState(0)
  const [cookies, setCookie] = useCookies(['token'])

  const getAdmins = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.get(`https://dev-admin.luxon.run/admin/user?order=ASC&page=${page}&take=10`)
=======
      setCookie('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
      console.log(cookies.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`
      const res = await axios.get('https://dev-admin.luxon.run/admin/user?order=ASC&page=1&take=10')
      
      setDataLength(res.data.meta.itemCount)
>>>>>>> 083ccd394fb3e5307977ae4bffbc10be13197244
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
        <AdminHead />
        <Admins adminData={admin} />
      </Container>
      <Flex justifyContent={'center'}>
        <PaginationFunc page={page} dataLength={dataLength} activePage={handlePageChange} />
      </Flex>
    </>
  )
}
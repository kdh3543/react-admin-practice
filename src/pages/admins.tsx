import axios from 'axios'
import { Key, useEffect, useState } from 'react'
import { Container, Flex } from '@chakra-ui/react'
import Admins from '../components/admin/Admins';
import AdminHead from '../components/admin/AdminHead';
import PaginationFunc from "../components/utils/PaginationFunc";

export default function Signup() {
  axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwODk3NzY2LCJleHAiOjE2NjM0ODk3NjZ9.cMs3ECnAfpNLzrxUSP_joTLSgvWuEywVsdq2xrKwmr0`
  const [admin, setAdmin] = useState<any>([])
  const [page, setPage] = useState(1)
  const [dataLength, setDataLength] = useState(0)

  const getAdmins = async () => {
    try {
      const res = await axios.get(`https://dev-admin.luxon.run/admin/user?order=ASC&page=${page}&take=10`)

      setDataLength(res.data.meta.itemCount)
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
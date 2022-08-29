import { useEffect, useState } from 'react'
import { Container, Flex } from '@chakra-ui/react'
import Admins from '../components/admin/Admins';
import AdminHead from '../components/admin/AdminHead';
import PaginationFunc from "../components/utils/PaginationFunc";
import member from '../apis/member';

const {getAdmins} = member()

export default function Signup() {
  const [admin, setAdmin] = useState<any>([])
  const [page, setPage] = useState(1)
  const [dataLength, setDataLength] = useState(0)
  const getAdminInfor = async () => {
    try {
      const res = await getAdmins(page)

      setDataLength(res.data.meta.itemCount)
      setAdmin(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    getAdminInfor()
  },[page])

  const handlePageChange = (page:any) => {
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
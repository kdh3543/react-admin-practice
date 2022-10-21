import { useEffect, useState } from 'react'
import { Container, Flex, Image } from '@chakra-ui/react'
import AdminBody from '../components/admin/AdminBody';
import AdminHead from '../components/admin/AdminHead';
import PaginationFunc from "../components/utils/PaginationFunc";
import member from '../apis/member';
import SelectOrder from '../components/utils/SelectOrder';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';

const {getAdmins, toActivate} = member()
const cookies = new Cookies()
export default function Signup() {
  const [admin, setAdmin] = useState<any>([])
  const [page, setPage] = useState(1)
  const [dataLength, setDataLength] = useState(0)
  const [order, setOrder] = useState('DESC')
  const router = useRouter();
  
  // get admin list
  

  const getAdminInfor = async () => {
    
    try {
      const res = await getAdmins(order, page)
      console.log(res)
      setDataLength(res.data.meta.itemCount)
      setAdmin(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (!cookies.get('mytoken')) {
      console.log('????')
      return
    }
    getAdminInfor()
  }, [page,order,cookies.get('mytoken')])

  //pagination
  const handlePageChange = (page: any) => {
    setPage(page)
  }

  // activate to admin user
  const onActivate = async (e:any,id:any, index:any) => {
    
    e.stopPropagation();
    const data = {
      adminUserId:id,
      activate: !admin[index].activatedAt
    }
    await toActivate(data).then(() => {
      getAdminInfor()
    }).catch((err:any) => {
      console.log(err)
    })
  }
  // select order(정렬)
  const onSelect = async (e: any) => {
    setOrder(e.target.value)
    const res = await getAdmins(order, page)
    setAdmin(res.data.data)
    setDataLength(res.data.meta.itemCount)
  }
  
  return (
    <>
      <Container
        maxW={'1200px'}
        mx={'auto'}
        mt={'40px'}
        position={'relative'}
      >
        <Flex textAlign={'center'} mt={'10px'} mb={'10px'}>
          <AdminHead />
        </Flex>
        <hr />
        <AdminBody adminData={admin} onActivate={onActivate}/>
        <Flex justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={dataLength} activePage={handlePageChange} />
          <SelectOrder onSelect={onSelect}/>
        </Flex>
      </Container>
    </>
  )
}
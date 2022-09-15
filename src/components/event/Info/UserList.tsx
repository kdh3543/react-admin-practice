import { Box, Flex, Container, Text } from "@chakra-ui/react"
import UserListHead from "./User/UserListHead"
import UserListBody from "./User/UserListBody"
import { useEffect, useState } from "react"
import eventApis from "../../../apis/event"
import PaginationFunc from "../../utils/PaginationFunc"
import SelectOrder from "../../utils/SelectOrder"

const {getUserList} = eventApis()
export default function UserList(props: any) {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('DESC')
  const [totalUser, setTotalUser] = useState(0)
  const [userData, setUserData] = useState([])

  // get user list
  const getList = async () => {
    const data = {
      id: props.id,
      page,
      order
    }
    await getUserList(data).then((res:any) => {
      setUserData(res.data.data)
      setTotalUser(res.data.meta.itemCount)
    })
  }

  //pagination
  const handlePageChange = (page: any) => {
    setPage(page)
  }


  useEffect(() => {
    getList()
  },[])
  return (
    <>
      
      <Container mt={'10px'} maxW={'1200px'}>
        <Text fontWeight={'600'} mt={'10px'}>
          Total User: {totalUser}
        </Text>
        <Flex textAlign={'center'} mt={'10px'} mb={'10px'}>
          <UserListHead />
        </Flex>
        <hr />
        <UserListBody userData={userData} />
        <Flex position={'relative'} justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={totalUser} activePage={handlePageChange} />
        </Flex>
      </Container>
    </>
  )
}
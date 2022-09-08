import { Flex, Container, Input, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaginationFunc from "../components/utils/PaginationFunc";
import member from "../apis/member";
import UserBody from "../components/user/UserBody";
import UserHead from "../components/user/UserHead";
import SelectOrder from "../components/utils/SelectOrder";
import Search from "../components/utils/Search";

const {getUsers, searchByAddress} = member()

export default function Test() {
  const titles = ['id', 'address', 'createdAt', 'deletedAt', 'droppedAt', 'updatedAt'];

  const router = useRouter();
  const [userData, setUserData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [dataLength, setDataLength] = useState<number>(0);
  const [order, setOrder] = useState('DESC')
  

  useEffect(() => {
    getUserData();
  }, [page, order]);

  // get user list
  const getUserData = async () => {
    const res = await getUsers(order,page)
    setDataLength(res.data.meta.itemCount);
    setUserData(res.data.data);
  }

  // pagination
  const activePage = (page:any) => {
    setPage(parseInt(page));
  }
  
  // move user info
  const moveInfo = (id:any) => {
    router.push({
      pathname: `/userinfo/${id}`,
      query: {
        id
      }
    }, `/userinfo/${id}`);
  }

  // select order(정렬)
  const onSelect = async (e: any) => {
    setOrder(e.target.value)
    const res = await getUsers(order, page)
    setUserData(res.data.data)
    setDataLength(res.data.meta.itemCount)
  }

  // search func
  const onSearch = async (data:any) => {
    await searchByAddress(data).then((res) => {
      console.log(res)
      // setUserData(res.data.data.user)
      // setDataLength(0)
    })
    
  }
  console.log(userData)
  return (
    <Container
        maxW={'1200px'}
        mx={'auto'}
        mt={'40px'}
        position={'relative'}
      >
      <Flex width={'6xl'} mt={10} flexDirection={'column'}>
        <Search onSearch={onSearch} />
        <Flex textAlign={'center'} mt={'20px'} mb={'10px'}>
          <UserHead />
        </Flex>
        <hr />
        <UserBody userData={userData} moveInfo={moveInfo}/>
        <Flex justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={dataLength} activePage={activePage} />
          <SelectOrder onSelect={onSelect}/>
        </Flex>
      </Flex>
    </Container>
  )
}

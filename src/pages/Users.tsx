import { Flex, Container, Input, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaginationFunc from "../components/utils/PaginationFunc";
import member from "../apis/member";
import UserBody from "../components/user/UserBody";
import UserHead from "../components/user/UserHead";
import SelectOrder from "../components/utils/SelectOrder";
import Search from "../components/utils/Search";
import { useSelector } from "react-redux";

const {getUsers, searchByAddress} = member()

export default function Users() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [dataLength, setDataLength] = useState<number>(0);
  const [order, setOrder] = useState('DESC')
  const [searchResult, setSearchResult] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    getUserData();
  }, [page, order]);

  // get user list
  const getUserData = async () => {
    await getUsers(order, page).then((res:any) => {
      console.log(res)
      setDataLength(res.data.meta.itemCount);
      setUserData(res.data.data);  
      setTotalUsers(res.data.meta.itemCount)
    })
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
  const onSearch = async (data: any) => {
    if (data) {
      await searchByAddress(data).then((res:any) => {
        console.log(res)
        if (res.data.code === 101) {
          setSearchResult(false)
        } else {
          setSearchResult(true)
          setPage(1)
          setUserData([res.data.data.user])
          setDataLength(1)
        }
      })
    } else {
      setSearchResult(true)
      await getUserData()
    }
  }

  // show user graph
  const showUserGraph = () => {
    router.push({
      pathname: '/UserGraph'
    },'/UserGraph')
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
        <Box>
          total User: {totalUsers}
        </Box>
        <Flex>
          <Search onSearch={onSearch} />
          <Button
            colorScheme={'blue'}
            ml={'auto'}
            onClick={showUserGraph}
          >
            User Graph
          </Button>
        </Flex>
        
        <Flex textAlign={'center'} mt={'20px'} mb={'10px'}>
          <UserHead />
        </Flex>
        <hr />
        
        {searchResult ? 
          <UserBody
            userData={userData}
            moveInfo={moveInfo}
          />
          :
          <Box
            textAlign={'center'}
            mt={'20px'}
            fontSize={'20px'}
            color={'red'}
            fontWeight={'bold'}
          >
            it is no result of search
          </Box>
        }
        
        <Flex justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={dataLength} activePage={activePage} />
          <SelectOrder onSelect={onSelect}/>
        </Flex>
      </Flex>
    </Container>
  )
}

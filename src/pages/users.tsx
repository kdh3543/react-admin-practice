import { Box, Flex, flexbox } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Cookies } from 'react-cookie';
import Pagination from "react-js-pagination";
import styles from '../../styles/pagination.module.css';
import PaginationFunc from "../components/utils/PaginationFunc";
import { getCookie } from "../utils/cookie";
// const cookies = new Cookies()

// cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
// const token = cookies.get('token')
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`



export default function Test() {
  // console.log(axios.defaults.headers.common['Authorization'])
  const titles = ['id', 'address', 'createdAt', 'deletedAt', 'droppedAt', 'updatedAt'];

  const router = useRouter();
  // const [cook, setCook] = useState('')
  // axios.defaults.headers.common['Authorization'] = `Bearer ${cook}`
  const [userData, setUserData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [dataLength, setDataLength] = useState<number>(0);

  useEffect(() => {
    getUserData();
  }, [page]);
  // useEffect(() => {
  //   setCook(getCookie('token'))
  // },[])

  const getUserData = async () => {
    const res = await axios({
      method: 'get',
      url: `https://dev-admin.luxon.run/user?order=ASC&page=${page}&take=10`,
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('myToken')}`
      }
    })
    console.log(res);
    // const res = await axios.get(`https://dev-admin.luxon.run/user?order=ASC&page=${page}&take=10`);
    setDataLength(res.data.meta.itemCount);
    setUserData(res.data.data);
  }

  console.log(userData);
  const activePage = (page:any) => {
    setPage(parseInt(page));
  }
  
  const moveInfo = (id:any) => {
    router.push({
      pathname: `/userinfo/${id}`,
      query: {
        id
      }
  }, `/userinfo/${id}`);
  }

  return (
    <Flex justifyContent={'center'}>
      <Flex width={'6xl'} mt={10} flexDirection={'column'}>
        <Flex border={'1px'} borderRadius={'5px'} >
          {titles.map((v, i) => {
            return (
              <Box width={"20%"} textAlign={'center'} py={4} pl={4} key={i}>
                {v}
              </Box>
            )
          })}
        </Flex>
        <Flex flexDirection={'column'}>
          {userData.map((v: any, i: number) => {
            return (
              <Box cursor={'pointer'} display={'flex'} key={i} border={'1px'} my={2} py={2} borderRadius={'5px'} justifyContent={'space-around'} onClick={() => {moveInfo(v.id)}}>
                {titles.map((va: any, j: any) => {
                  return (
                    <Box key={`${va}${j}`} fontSize={'10px'} display={'flex'} justifyContent={'space-around'} width={"20%"} textAlign={'center'} px={'30px'}>
                      {v[titles[j]] !== null ? v[titles[j]] : 'null'}
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Flex>
        <PaginationFunc page={page} dataLength={dataLength} activePage={activePage} />
        
      </Flex>
    </Flex>
  )
}

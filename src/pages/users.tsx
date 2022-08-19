import { Box, Flex, flexbox } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setToken, getToken } from '../localStorage/token'
import PaginationFunc from "../components/utils/PaginationFunc";

export default function Test() {
  axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwODk3NzY2LCJleHAiOjE2NjM0ODk3NjZ9.cMs3ECnAfpNLzrxUSP_joTLSgvWuEywVsdq2xrKwmr0`
  const titles = ['id', 'email', 'createdAt', 'activatedAt', 'deletedAt', 'roles'];

  const router = useRouter();
  const [userData, setUserData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [dataLength, setDataLength] = useState<number>(0);

  useEffect(() => {
    getUserData();
  }, [page]);

  const getUserData = async () => {
    const res = await axios.get(`https://dev-admin.luxon.run/user?order=ASC&page=${page}&take=10`);
    setDataLength(res.data.meta.itemCount);
    setUserData(res.data.data);
  }


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
              <Box width={"20%"} textAlign={'center'} py={4} key={i}>
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
                    <Box key={`${va}${j}`} fontSize={'10px'} display={'flex'} justifyContent={'space-around'} width={"20%"} textAlign={'center'}>
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

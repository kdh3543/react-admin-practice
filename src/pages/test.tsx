import { Box, Flex, flexbox } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie'
import Pagination from "react-js-pagination";
import styles from '../../styles/pagination.module.css';
const cookies = new Cookies()

cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
const token = cookies.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default function Test() {
  const titles = ['id', 'email', 'createdAt', 'activatedAt', 'deletedAt', 'roles'];

  const [userData, setUserData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [dataLength, setDataLength] = useState(0);
  useEffect(() => {
    getUserData();
  }, [page]);

  const getUserData = async () => {
    const res = await axios.get(`https://dev-admin.luxon.run/admin/user?order=ASC&page=${page}&take=10`);
    setDataLength(res.data.meta.itemCount);
    setUserData(res.data.data);
  }

  const activePage = (page:any) => {
    setPage(parseInt(page));
  }
  console.log(userData);
  return (
    <Flex justifyContent={'center'}>
      <Flex width={'6xl'} mt={10} flexDirection={'column'}>
        <Flex border={'1px'} borderRadius={'5px'} >
          {titles.map((v, i) => {
            return (
              <Box width={"16.7%"} textAlign={'center'} py={4} key={i}>
                {v}
              </Box>
            )
          })}
        </Flex>
        <Flex flexDirection={'column'}>
          {userData.map((v: any, i: number) => {
            return (
              <Box display={'flex'} key={i} border={'1px'} my={2} py={2} borderRadius={'5px'} justifyContent={'space-around'}>
                {titles.map((va: any, j: any) => {
                  return (
                    <Box key={`${va}${j}`} fontSize={'14px'} display={'flex'} justifyContent={'space-around'} width={"16.7%"} textAlign={'center'}>
                      {v[titles[j]] !== null ? v[titles[j]] : 'null'}
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Flex>
        <Flex flexDirection={'row'}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={dataLength}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={activePage}
            itemClass={styles.pagination}
            activeClass={styles.active}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

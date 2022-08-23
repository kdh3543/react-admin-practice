import { useRouter } from "next/router"
import axios from "axios"
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Select,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react";

export default function AdminInfor() {
  axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwODk3NzY2LCJleHAiOjE2NjM0ODk3NjZ9.cMs3ECnAfpNLzrxUSP_joTLSgvWuEywVsdq2xrKwmr0`
  const titles = ['id','Email','createdAt','updatedAt','deletedAt','activatedAt'];
  const [adInfo, setAdInfo] = useState<any>({})
  const [grade, setGrade] = useState<any>('')
  const router = useRouter()

  const getAdminInfo = async () => {
    await axios.get(`https://dev-admin.luxon.run/admin/user/${router.query.admin}`).then((res) => {
      if (res.data.code===0) {
        setAdInfo(res.data.data)  
      }
    })
  }
  useEffect(() => {
    getAdminInfo()  
  },[router.query,adInfo])
  
  const modifyGrade = async () => {
    if (grade) {
      const sendNum = parseInt(router.query.admin);
      await axios.put(`https://dev-admin.luxon.run/admin/user/role`, {
        adminUserId: sendNum,
        roles: grade
      }).then((res) => {
        if (res.data.code === 0) {
          adInfo.roles = grade
        }
      })
    }
  }

  const select = (e:any) => {
    setGrade(e.target.value)
  }

  const goBack = () => {
    router.back();
    // history.back(); 거기서 거기 ~
  }
  return (
    <Center py={'100px'}>
      <Box
        maxW={'600px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'5xl'} fontWeight={800}>
              Admin Info
            </Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={5}>
          <List spacing={3} display={'flex'} alignItems={'center '}>
            <ListItem w={'30%'} fontWeight={'bolder'}>
              {titles.map((data:any) => (
                <Box mt={5}  key={data} >
                  {data}
                </Box>
              ))}
            </ListItem>
            <ListItem  w={'70%'} fontWeight={800} >
              <Box mt={5}>
                {adInfo.id}
              </Box>
              <Box mt={5}>
                {adInfo.email}
              </Box>
              <Box mt={5}>
                {adInfo.createdAt}
              </Box>
              <Box mt={5}>
                {adInfo.updatedAt}
              </Box>
              <Box mt={5}>
                {adInfo.deletedAt ? adInfo.deletedAt : 'null'}
              </Box>
              <Box mt={5}>
                {adInfo.activatedAt ? adInfo.activatedAt : 'null'}
              </Box>
              <Box mt={5} display={'flex'} alignItems={'center'}>
                {adInfo.roles}
                <Select onChange={select} ml={3} fontSize={'12px'} w={'30%'} placeholder="Select">
                  <option value='GUEST'>
                    GUEST
                  </option>
                  <option value='CUSTOMER'>
                    CUSTOMER
                  </option>
                  <option value='MANAGER'>
                    MANAGER
                  </option>
                  <option value='ADMIN'>
                    ADMIN
                  </option>
                </Select>
                <Button onClick={modifyGrade} ml={2}>
                  modify
                </Button>
              </Box>
            </ListItem>
          </List>
          <Button
            onClick={goBack}
            mt={10}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Center>
  )
}
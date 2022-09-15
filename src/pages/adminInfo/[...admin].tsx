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
  Image
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import member from "../../apis/member";
import { getCookie } from "../../utils/cookie";

const {modifyAdminInfo, getAdminInfo} = member()
export default function AdminInfor() {
  const titles = ['id','Email','createdAt','updatedAt','deletedAt','activatedAt','roles']
  const [adInfo, setAdInfo] = useState<any>({})
  const [grade, setGrade] = useState<any>('')
  const router = useRouter()
  
  const infos = async () => {
    console.log(router.query)
    if (router.query.admin) {
      await getAdminInfo(router.query.admin).then((res:any) => {
        console.log(res)
        setAdInfo(res.data.data)  
      })
      // const res = await getAdminInfo(router.query.admin)
      // if (res.data.code === 0) {
      //   setAdInfo(res.data.data)  
      // }
    }
  }

  useEffect(() => {
    infos() 
  },[router.query.admin])
  
  const modifyGrade = async () => {
    if (grade) {
      const sendId = parseInt(router.query.admin);
      const res = await modifyAdminInfo(sendId, grade)
      if (res.data.code === 0) {
        setAdInfo({...adInfo, roles:grade})
      }
    }
  }

  const select = (e:any) => {
    setGrade(e.target.value)
  }

  const goBack = () => {
    router.back();
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

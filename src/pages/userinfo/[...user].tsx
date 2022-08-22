import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';

import axios from "axios";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Cookies } from 'react-cookie'
import { FaCircle } from 'react-icons/fa';
const UserInfo = () => {

  const cookies = new Cookies()

  cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
  const token = cookies.get('token')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const router = useRouter();
  const [userDatas, setUserDatas] = useState<any>({
    connects: [],
    profile: {},
    user: {}
  });
  const infos = async () => {
    try {
      const res = await axios.get(`https://dev-admin.luxon.run/user/${router.query.user}`);
      console.log(res);
      setUserDatas({connects: res.data.data.connects, profile: res.data.data.profile, user: res.data.data.user});
    } catch (err) {
      console.log(err);
    }
  }
  console.log(userDatas);
  useEffect(() => {
    infos();
  }, [router.query.user])


  function PriceWrapper({ children }: { children: ReactNode }) {
    return (
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: 'center', lg: 'flex-start' }}
        borderColor={useColorModeValue('gray.200', 'gray.500')}
        borderRadius={'xl'}>
        {children}
      </Box>
    );
  }

  const back = () => {
    router.back();
  }

  return (

    <Center display={'flex'} flexDirection={'column'} py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Box
          h={'120px'}
          w={'full'}
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-20}>
          <Avatar
            size={'xl'}
            src={
              userDatas.profile.profileImageUrl
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} >
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {userDatas.profile.username === null ? 'null' : userDatas.profile.username}
            </Heading>
            <Text color={'gray.500'} fontSize={'12px'}>생성일 {userDatas.profile.createdAt}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>상태</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                {!userDatas.connects.length ? "연동 안됨" : "연동 됨"}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Button position={'absolute'} top={'10%'} right={'35%'} onClick={back}>뒤로</Button>
      <Box py={12}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}>
          <PriceWrapper>
            <Box py={5} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                세부정보
              </Text>
              <HStack justifyContent="center">
                <List spacing={5} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCircle} color="gray.400" />
                    id: {userDatas.user.id ? userDatas.user.id : "null"}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCircle} color="gray.400" />
                    Address: {userDatas.user.address ? userDatas.user.address : "null"}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCircle} color="gray.400" />
                    createdAt: {userDatas.user.createdAt ? userDatas.user.createdAt : "null"}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCircle} color="gray.400" />
                    updatedAt: {userDatas.user.updatedAt ? userDatas.user.updatedAt : "null"}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCircle} color="gray.400" />
                    deletedAt: {userDatas.user.deletedAt ? userDatas.user.deletedAt : "null"}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCircle} color="gray.400" />
                    droppedAt: {userDatas.user.droppedAt ? userDatas.user.droppedAt : "null"}
                  </ListItem>
                </List>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Box>
    </Center>
  )
}

export default UserInfo;
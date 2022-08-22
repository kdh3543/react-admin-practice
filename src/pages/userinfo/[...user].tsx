import {
  Center,
  Button,
} from '@chakra-ui/react';

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie'

import UserInfoPage from '../../components/user/firstUserPage';
import SecondUserPage from '../../components/user/secondUserPage';


const UserInfo = () => {

  const cookies = new Cookies()

  cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
  const token = cookies.get('token')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const router = useRouter();
  console.log(router.query);
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

  useEffect(() => {
    infos();
  }, [router.query.user])

  const back = () => {
    router.back();
  }

  return (

    <Center display={'flex'} flexDirection={'column'} py={6}>
      <UserInfoPage img={userDatas.profile.profileImageUrl} name={userDatas.profile.username} createdAt={userDatas.profile.createdAt} connects={userDatas.connects} />
      <Button position={'absolute'} top={'10%'} right={'35%'} onClick={back}>뒤로</Button>
      <SecondUserPage user={userDatas.user} />
    </Center>
  )
}

export default UserInfo;
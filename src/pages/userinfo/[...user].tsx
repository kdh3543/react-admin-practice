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
import { getCookie } from "../../utils/cookie";

const UserInfo = () => {

  const router = useRouter();
  const [userDatas, setUserDatas] = useState<any>({
    connects: [],
    profile: {},
    user: {}
  });

  const infos = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `https://dev-admin.luxon.run/user/${router.query.user}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
      console.log(res);
      setUserDatas({connects: res.data.data.connects, profile: res.data.data.profile, user: res.data.data.user});
    } catch (err) {
      router.back();
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
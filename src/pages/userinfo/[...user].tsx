import {
  Center,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ProfilePage from '../../components/user/Info/ProfilePage';
import UserPage from '../../components/user/Info/UserPage';
import ConnectPage from '../../components/user/Info/ConnectPage'
import member from '../../apis/member';
import { getCookie } from "../../utils/cookie";
import style from '../../../styles/User.module.css';

const { getUserInfo } = member()
const UserInfo = () => {
  const [inUser, setInUser] = useState(true)
  const [inProfile, setInProfile] = useState(false)
  const [inConnect, setInConnect] = useState(false)
  const router = useRouter();
  const [userDatas, setUserDatas] = useState<any>({
    connects: [],
    profile: {},
    user: {}
  });

  const infos = async () => {
    if (router.query.user) {
      const res = await getUserInfo(router.query.user)
      console.log(res.data.data.connects[0])
      setUserDatas({connects: res.data.data.connects[0], profile: res.data.data.profile, user: res.data.data.user});  
    }
  }

  useEffect(() => {
    if (getCookie('myToken')) {
      infos();  
    }
    
  }, [router.query.user])

  const back = () => {
    router.back();
  }

  const openUser = () => {
    setInUser(true)
    setInConnect(false)
    setInProfile(false)
  }
  const openProfile = () => {
    setInUser(false)
    setInConnect(false)
    setInProfile(true)
  }
  const openConnect = () => {
    setInUser(false)
    setInConnect(true)
    setInProfile(false)
  }

  return (

    <Center display={'flex'} flexDirection={'column'}>
      
      <Flex w={'50%'} mt={'40px'} textAlign={'center'}>
        <div onClick={openUser} className={style.title}>USER</div>
        <div onClick={openProfile} className={style.title}>PROFILE</div>
        <div onClick={openConnect} className={style.title}>CONNECT</div>
      </Flex>
      
      {inUser ? <UserPage user={userDatas.user} /> : ''}
      {inProfile ? <ProfilePage profile={userDatas.profile} connects={userDatas.connects} /> : ''}
      {inConnect ? <ConnectPage connectDatas={userDatas.connects}/> : ''}
      
      <Button onClick={back}>뒤로</Button>
    </Center>
  )
}

export default UserInfo;
import {
  Center,
  Button,
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import UserInfoPage from '../../components/user/firstUserPage';
import SecondUserPage from '../../components/user/secondUserPage';
import member from '../../apis/member';
const { getUserInfo } = member()
const UserInfo = () => {

  const router = useRouter();
  const [userDatas, setUserDatas] = useState<any>({
    connects: [],
    profile: {},
    user: {}
  });

  const infos = async () => {
    const res = await getUserInfo(router.query.user)
    console.log(res)
    setUserDatas({connects: res.data.data.connects, profile: res.data.data.profile, user: res.data.data.user});
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
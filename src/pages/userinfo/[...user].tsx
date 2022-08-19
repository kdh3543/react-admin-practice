import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie'
const UserInfo = () => {

  const cookies = new Cookies()

  cookies.set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwNzE1MjgwLCJleHAiOjE2NjMzMDcyODB9.zBgx2E8bjwcfH_zGGejuQJhWmeHFHKF2DOM8SLsANsA')
  const token = cookies.get('token')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const router = useRouter();
  const [userDatas, setUserDatas] = useState<any>([]); 
  const infos = async () => {
    try {
      const res = await axios.get(`https://dev-admin.luxon.run/user/${router.query.user}`);
      setUserDatas(res.data.data);
    }catch (err) { 
      console.log( err );
    }
  } 
  console.log(userDatas);
  useEffect(() => {
    infos();
  },[router.query.user])

  return (
    <Box>
      {
        userDatas ?
        <Box>
          {userDatas.userId}
        </Box> :
        "loading"
      }
    </Box>
  )
}

export default UserInfo;
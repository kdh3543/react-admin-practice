import {
  Center,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import style from '../../../styles/User.module.css';
import eventApis from '../../apis/event';
import Info from '../../components/event/Info/Info'
import UserList from '../../components/event/Info/UserList';

const {getEventInfo} = eventApis()
export default function EventInfo() {
  const router = useRouter()
  const [infoData, setInfoData] = useState([])
  const [infoStatus, setInfoStatus] = useState(true)
  const infoList = async () => {
    if (router.query.event) {
      await getEventInfo(router.query.event).then((res:any) => {
        if (res.data.code === 0) {
          res.data.data.endAt = res.data.data.endAt.split('T')[0]
          res.data.data.startAt = res.data.data.startAt.split('T')[0]
          setInfoData(res.data.data)
        }
      })
    }
  }

  useEffect(() => {
    infoList();  
  }, [router.query.event])

  const openInfo = () => {
    setInfoStatus(true)
  }
  const openUser = () => {
    setInfoStatus(false)
  }

  // back button
  const back = () => {
    router.push('/Event')
  }

  return (
    <Center display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} w={'50%'} mt={'40px'} textAlign={'center'}>
        <div onClick={openInfo} className={style.eventTitle}>INFO</div>
        <div onClick={openUser} className={style.eventTitle}>USER LIST</div>
      </Box>
      
      {infoStatus
        ? <Info infoData={infoData} />
        : <UserList id={infoData.id} />
      }
      <Box display={'flex'} mt={'10px'}>
        
        <Button colorScheme={'purple'} m={'10px'}>db import</Button>
        <Button colorScheme={'purple'} m={'10px'}>contract import</Button>
        <Button colorScheme={'purple'} m={'10px'} onClick={back}>Back</Button>
      </Box>
      
    </Center>
  )
}

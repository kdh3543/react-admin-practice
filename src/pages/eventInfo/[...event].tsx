import {
  Center,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import style from '../../../styles/User.module.css';
import eventApis from '../../apis/event';
import Info from '../../components/event/Info/Info'
import UserList from '../../components/event/Info/UserList';
import DbImportModal from '../../components/modal/dbImportModal';
import slice from '../../components/hooks/store/slice/eventSlice';
const eventSlice = slice()
const {
  getEventInfo,
  importFile,
  airdropUserContractImport,
  updateEvent
} = eventApis()
export default function EventInfo() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [infoData, setInfoData] = useState([])
  const [infoStatus, setInfoStatus] = useState(true)

  // get event info list
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

  // info, user list button click
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

  // modal status
  const openDbModal = () => {
    dispatch(eventSlice.importSlice.actions.open(true))
  }
  const closeModal = () => {
    dispatch(eventSlice.importSlice.actions.open(false))
  }

  // register button
  const onRegister = async (file: any) => {
    
    const data = {
      id: router.query.event,
      file
    }
    await importFile(data).then((res:any) => {
      dispatch(eventSlice.importSlice.actions.open(false))
      console.log(res)
    })
  }

  // contract import button
  const importContract = async () => {
    await airdropUserContractImport().then((res:any) => {
      console.log(res)
    })
  }

  // update event info
  const updateInfo = async (data:any) => {
    console.log(data)
    await updateEvent(data).then((res:any) => {
      console.log(res)
      if (res.data.code === 0) {
        infoList()
      }
    })
  }

  return (
    <Center display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} w={'50%'} mt={'40px'} textAlign={'center'}>
        <div onClick={openInfo} className={style.eventTitle}>INFO</div>
        <div onClick={openUser} className={style.eventTitle}>USER LIST</div>
      </Box>
      
      {infoStatus
        ? <Info infoData={infoData} updateInfo={updateInfo}/>
        : <UserList id={infoData.id}  />
      }
      <Box display={'flex'} mt={'10px'}>
        <Button
          colorScheme={'purple'}
          m={'10px'}
          onClick={openDbModal}
        >
          db import
        </Button>
        <Button
          colorScheme={'purple'}
          m={'10px'}
          onClick={importContract}
        >
          contract import
        </Button>
        <Button
          colorScheme={'purple'}
          m={'10px'}
          onClick={back}
        >
          Back
        </Button>
      </Box>
      <DbImportModal
        closeModal={closeModal}
        id={infoData.id}
        onRegister={onRegister}
      />
    </Center>
  )
}

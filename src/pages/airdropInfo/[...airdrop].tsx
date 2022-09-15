import { Container,Box,Stack,Link, Button, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import nft from "../../apis/nft"
import { getCookie } from "../../utils/cookie"
import InfoBody from "../../components/airdrop/Info/InfoBody"
import InfoHead from "../../components/airdrop/Info/InfoHead"
import PaginationFunc from "../../components/utils/PaginationFunc";
import fileDownload from "js-file-download"
import PKeyModal from "../../components/modal/pKeyModal"
import eventSlice from "../../components/hooks/store/slice/eventSlice"
import { useDispatch } from 'react-redux'

const reduxSlice = eventSlice()
const {getAirdropInfo, exportFile, airDropTokenIdExist, run} = nft()
const AirdropInfo = (props:any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [info, setInfo] = useState<any>([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('ASC')
  const [dataLength, setDataLength] = useState(0)
  const [success, setSuccess] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [pKeyError, setPKeyError] = useState('')
  const [rightPKey, setRightPKey] = useState(false)

  // get airdrop list
  const getAirdrop = async () => {
    
    if (router.query.airdrop) {
      const data = {
        id: router.query.airdrop,
        page: page,
        order: order
      }
      const res = await getAirdropInfo(data)
      if (res.data.code === 0) {
        
        setInfo(res.data.data)  
        setDataLength(res.data.meta.itemCount)
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].state === 'REGISTERED') {
            setSuccess(false)
          } else {
            setSuccess(true)
          }
        }
      }
    }
  }

  // back button
  const toAirDrop = () => {
    router.push('/AirDrop')
  }

  useEffect(() => {
    getAirdrop()  
  }, [router.query.airdrop])
  
  //pagination
  const handlePageChange = (page: any) => {
    setPage(page)
  }

  // export button
  const downloadFile = async () => {
    console.log(router.query.airdrop)
    await exportFile(router.query.airdrop).then((res:any) => {
      fileDownload(res.data,'airdrop.csv')
    })
  }

  // run button
  const openPKeyModal = async () => {
    await airDropTokenIdExist(router.query.airdrop).then((res:any) => {
      if(res.data.data.taskIds.length==0){
        setModalStatus(true)
        dispatch(reduxSlice.openSlice.actions.open(true))
      } else {
        setModalStatus(false)
        dispatch(reduxSlice.openSlice.actions.open(false))
      }
    })
  }

  const closeModal = () => {
    dispatch(reduxSlice.openSlice.actions.open(false))
    setPKeyError('')
    setRightPKey(false)
  }

  const onRun = async (pKey:any) => {
    const data = {
      privateKey: pKey,
      id: router.query.airdrop
    }
    await run(data).then((res:any) => {
      if (res.data.code === 0) {
        dispatch(reduxSlice.openSlice.actions.open(false))
        setPKeyError('')
        setRightPKey(false)
      } else {
        dispatch(reduxSlice.openSlice.actions.open(true))
        setRightPKey(true) 
        setPKeyError(res.data.message)
      }
    })
  }
  return (
    <>
      <Container maxW={'1200px'} mx={'auto'} mt={'40px'}>
        <InfoHead
          openPKeyModal={openPKeyModal}
          downloadFile={downloadFile}
          toAirDrop={toAirDrop}
          success={success}
        />
        <hr />
        <InfoBody info={info} />
        
        <Flex justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={dataLength} activePage={handlePageChange} />
        </Flex>
        {modalStatus
          ? <PKeyModal
            closeModal={closeModal}
            onRun={onRun}
            rightPKey={rightPKey}
            pKeyError={pKeyError}
          />
          : ''
        }
        
      </Container>
    </>
  )
}
export default AirdropInfo
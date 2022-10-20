import { useEffect, useState } from 'react'
import { Container, Flex } from '@chakra-ui/react'
import EventHead from '../components/event/EventHead'
import EventBody from '../components/event/EventBody'
import eventApis from '../apis/event'
import PaginationFunc from '../components/utils/PaginationFunc'
import { useDispatch } from 'react-redux'
import slice from '../components/hooks/store/slice/nftSlice'
import RegisterEventModal from '../components/modal/registerEventModal'
import nft from "../apis/nft";
import { useRouter } from "next/router";

const {getEventList, deleteEvent, registerEvent} = eventApis()
const nftSlice = slice()
const {getContractLists} = nft()
export default function Event() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [eventList, setEventList] = useState<any>([])
  const [page, setPage] = useState(1)
  const [dataLength, setDataLength] = useState(0)
  const [order, setOrder] = useState('ASC')
  const [contractData, setContractData] = useState<any>([])
  const [type, setType] = useState(null)
  const [subType, setSubType] = useState(null)
  const [tokenId,setTokenId] = useState('')
  const [amount, setAmount] = useState('')
  const [maxCount, setMaxCount] = useState('')
  const [contract, setContract] = useState(null)
  const [eventId, setEventId] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endData, setEndDate] = useState(null)
  const [error, setError] = useState(false)
  // get event list
  const getList = async () => {
    await getEventList(page, order).then((res: any) => {
      console.log(res.data.data.length)
      if (res.data.data.length) {
        setEventList(res.data.data)
        setDataLength(res.data.meta.itemCount)
      }
    })
  }

  // pagination
  const handlePageChange = (page: any) => {
    setPage(page)
  }

  // delete func
  const onDelete = async (id:any) => {
    await deleteEvent(id).then(() => {
      dispatch(nftSlice.deleteSlice.actions.open(false))
      getList()
    }).catch((err:any) => {
      console.log(err)
    })
  }

  // register modal
  const openRegister = () => {
    dispatch(nftSlice.registerSlice.actions.open(true))
  }
  const closeModal = () => {
    dispatch(nftSlice.registerSlice.actions.open(false))
  }
  const choiceType = (e:any) => {
    setType(e.target.value)
  }
  const choiceSubType = (e: any) => {
    setSubType(e.target.value)
  }
  const writeToken = (e: any) => {
    console.log(e.target.value)
    setTokenId(e.target.value)
  }
  const writeAmount = (e: any) => {
    setAmount(e.target.value)
  }
  const choiceContract = (e: any) => {
    setContract(e.target.value)
  }
  const writeEventId = (e: any) => {
    setEventId(e.target.value)
  }
  const writeMaxCount = (e: any) => {
    setMaxCount(e.target.value)
  }
  const choiceStart = (e: any) => {
    setStartDate(e.target.value)
  }
  const choiceEnd = (e: any) => {
    setEndDate(e.target.value)
  }
  const onRegister = async () => {
    if (
      !type ||
      !subType ||
      !tokenId ||
      !amount ||
      !maxCount ||
      !contract ||
      !startDate ||
      !endData
    ) {
      setError(true)
      return false
    } 

    setError(false)
    const data = {
      type: type,
      subType: subType,
      tokenId: tokenId,
      amount: amount,
      maxApplyCount: maxCount,
      contractId: contract,
      preconditionEventId: eventId,
      startAt: startDate,
      endAt: endData
    }
    await registerEvent(data).then((res: any) => {
      if (res.data.code === 0) {
        dispatch(nftSlice.registerSlice.actions.open(false))
        getList()
        setType(null)
        setSubType(null)
        setTokenId('')
        setAmount('')
        setMaxCount('')
        setContract(null)
        setEventId('')
        setStartDate(null)
        setEndDate(null)
        return true
      } 
      return false
    })
    return true
  }

  // get contract list
  const getContractList = async () => {
    await getContractLists().then((res:any) => {
      setContractData(res.data.data)
    })
  }

  // open event info
  const toEventInfo = (id: any) => {
    router.push({
      pathname: `/eventInfo/${id}`,
      query: {
        id
      }
    },`/eventInfo/${id}`)
  }

  const openEventGraph = () => {
    router.push({
      pathname: '/EventGraph'
    },'/EventGraph')
  }

  useEffect(() => {
    getList()
  }, [page, order])
  useEffect(() => {
    getContractList()
  },[])
  return (
    <>
      <Container
        maxW={'1200px'}
        mx={'auto'}
        mt={'40px'}
        position={'relative'}
      >
        <EventHead openRegister={openRegister} openEventGraph={openEventGraph} />
        <hr />
        <EventBody
          eventList={eventList}
          onDelete={onDelete}
          toEventInfo={toEventInfo}
        />
        <Flex justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={dataLength} activePage={handlePageChange} />
          {/* <SelectOrder onSelect={onSelect}/> */}
        </Flex>
        <RegisterEventModal
          closeModal={closeModal}
          choiceType={choiceType}
          choiceSubType={choiceSubType}
          choiceContract={choiceContract}
          writeEventId={writeEventId}
          choiceStart={choiceStart}
          choiceEnd={choiceEnd}
          type={type}
          contractData={contractData}
          startDate={startDate}
          writeToken={writeToken}
          writeAmount={writeAmount}
          writeMaxCount={writeMaxCount}
          onRegister={onRegister}
          error={error}
        />
      </Container>
    </>
  )
}
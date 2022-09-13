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

const {getEventList, deleteEvent, registerEvent} = eventApis()
const reduxSlice = slice()
const {getContractLists} = nft()
export default function Event() {
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
    await getEventList(page, order).then((res) => {
      if (res.data.code === 0) {
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
      dispatch(reduxSlice.deleteSlice.actions.open(false))
      getList()
    }).catch((err) => {
      console.log(err)
    })
  }

  // register modal
  const openRegister = () => {
    dispatch(reduxSlice.registerSlice.actions.open(true))
  }
  const closeModal = () => {
    dispatch(reduxSlice.registerSlice.actions.open(false))
  }
  const choiceType = (e:any) => {
    setType(e.target.value)
  }
  const choiceSubType = (e: any) => {
    setSubType(e.target.value)
  }
  const writeToken = (e: any) => {
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
    } else {
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
      await registerEvent(data).then((res) => {
        if (res.data.code === 0) {
          dispatch(reduxSlice.registerSlice.actions.open(false))
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
        } else {
          console.log(res)
        }
      })
    }
  }

  // get contract list
  const getContractList = async () => {
    await getContractLists().then((res) => {
      setContractData(res.data.data)
    })
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
        <EventHead openRegister={openRegister}/>
        <hr />
        <EventBody eventList={eventList} onDelete={onDelete}/>
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
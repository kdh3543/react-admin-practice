import { Container, Flex, Box, Button, background, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import PaginationFunc from '../components/utils/PaginationFunc'
import nft from '../apis/nft'
import AirDropTitle from '../components/airdrop/AirDropHead'
import AirDropBody from '../components/airdrop/AirDropBody'
import { useDispatch } from 'react-redux'
import slice from '../components/hooks/store/slice/nftSlice'
import RegisterAirDropModal from '../components/modal/registerAirDropModal'
import SelectOrder from '../components/utils/SelectOrder'

const { getDropList, deleteAirDrop, register, getContractLists } = nft()
const reduxSlice = slice()
export default function AirDrop() {
  const dispatch = useDispatch()
  const [list, setList] = useState<any>([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('DESC')
  const [dataLength, setDataLength] = useState(0)
  const [title, setTilte] = useState('')
  const [contract, setContract] = useState(null)
  const [file, setFile] = useState<any>({})
  const [contractData, setContractData] = useState<any>([])

  // get list
  const getAirDropList = async () => {
    const res = await getDropList(order, page)
    setList(res.data.data)
    setDataLength(res.data.meta.itemCount)
  }

  useEffect(() => {
    getAirDropList()
  }, [page,order])
  useEffect(() => {
    getContractList()
  },[])

  // delete list
  const onDelete = async (id:any) => {
    await deleteAirDrop(id).then((res) => {
      dispatch(reduxSlice.deleteSlice.actions.open(false))
      getAirDropList()
    }).catch((err) => {
      console.log(err)
    })
  }

  // pagination
  const handlePageChange = (page:any) => {
    setPage(page)
  }

  // register modal
  const openRegister = () => {
    dispatch(reduxSlice.registerSlice.actions.open(true))
  }
  const closeModal = () => {
    dispatch(reduxSlice.registerSlice.actions.open(false))
  }

  // register
  const writeTitle = (e:any) => {
    setTilte(e.target.value)
  }
  const choiceContract = (e: any) => {
    setContract(contractData.find((data:any)=>data.name === e.target.value))
  }
  const choiceFile = (e: any) => {
    setFile(e.target.files[0])
  }
  const registerTask = async () => {
    const data = {
      title,
      file,
      contract: contract.id
    }
    await register(data).then((res) => {
      console.log(res)
      dispatch(reduxSlice.registerSlice.actions.open(false))
      getAirDropList()
    })
  }

  // get contract list
  const getContractList = async () => {
    await getContractLists().then((res) => {
      setContractData(res.data.data)
    })
  }

  // select order(정렬)
  const onSelect = async (e: any) => {
    setOrder(e.target.value)
    const res = await getDropList(order, page)
    setList(res.data.data)
    setDataLength(res.data.meta.itemCount)
  }
  return (
    <Container
      maxW={'1300px'}
      mx={'auto'}
      mt={'40px'}
      position={'relative'}
    >
      <Box textAlign={'right'}>
        <Button
          size={'sm'}
          borderRadius={'10px'}
          colorScheme='purple'
          onClick={openRegister}
        >
          Register
        </Button>
      </Box>
      <Flex textAlign={'center'} mt={'10px'} mb={'10px'}>
        <AirDropTitle />
      </Flex>
      <hr />
      <AirDropBody list={list} onDelete={onDelete} />
      <Flex justifyContent={'center'}>
        <PaginationFunc
          page={page}
          dataLength={dataLength}
          activePage={handlePageChange}
        />
        <SelectOrder onSelect={onSelect}/>
      </Flex>
      
      <RegisterAirDropModal
        closeModal={closeModal}
        writeTitle={writeTitle}
        choiceContract={choiceContract}
        choiceFile={choiceFile}
        registerTask={registerTask}
      />
      
    </Container>
  )
}
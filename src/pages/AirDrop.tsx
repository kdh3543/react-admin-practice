import { Container, Flex, Box, Button, background } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import PaginationFunc from '../components/utils/PaginationFunc'
import nft from '../apis/nft'
import AirDropTitle from '../components/airdrop/AirDropTitle'
import AirDropBody from '../components/airdrop/AirDropBody'

const {getDropList} = nft()
export default function AirDrop() {
  const [list, setList] = useState<any>([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('ASC')
  const [dataLength, setDataLength] = useState(0)

  const getAirDropList = async () => {
    const res = await getDropList(order, page)
    setList(res.data.data)
    setDataLength(res.data.meta.itemCount)
  }

  useEffect(() => {
    getAirDropList()
  },[page])

  const onDelete = async (id:any) => {
    console.log(id)
    console.log('here')
  }
  const handlePageChange = (page:any) => {
    setPage(page)
  }

  return (
    <Container
      maxW={'1200px'}
      mx={'auto'}
      mt={'40px'}
    >
      <Flex textAlign={'center'} mb={'10px'}>
        <AirDropTitle />
      </Flex>
      <hr />
      
      <AirDropBody list={list} onDelete={onDelete} />
      <Flex justifyContent={'center'}>
        <PaginationFunc page={page} dataLength={dataLength} activePage={handlePageChange} />
      </Flex>
      
    </Container>
  )
}
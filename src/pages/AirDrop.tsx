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
    try {
      const res = await getDropList(order, page)
      setList(res.data.data)
      setDataLength(res.data.meta.itemCount)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAirDropList()
  },[page])

  const testDown = (e:any) => {
    e.stopPropagation()
    console.log('testDown')
  }
  const testUp = (e:any) => {
    e.stopPropagation()
    console.log('testUp')
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
      {list.map((data: any, index: Number) => (
        <Flex onClick={testDown} cursor={'pointer'} alignItems={'center'} key={data.id} textAlign={'center'} mt={'10px'} border={'1px solid black'} borderRadius={'15px'} p={'5px'}>
          <AirDropBody index={index} data={data} />
        </Flex>
      ))}
      
    </Container>
  )
}
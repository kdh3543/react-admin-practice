import { Container,Box,Stack,Link, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import nft from "../../apis/nft"
import NextLink from "next/link"
import { getCookie } from "../../utils/cookie"
import InfoBody from "../../components/airdrop/Info/InfoBody"
import InfoHead from "../../components/airdrop/Info/InfoHead"

const {getAirdropInfo} = nft()
const AirdropInfo = () => {
  const router = useRouter()
  const [info, setInfo] = useState<any>([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('ASC')
  const [dataLength, setDataLength] = useState(0)

  const getAirdrop = async () => {
    console.log(router.query.airdrop)
    if (router.query.airdrop) {
      const data = {
        id: router.query.airdrop,
        page: page,
        order: order
      }
      const res = await getAirdropInfo(data)
      console.log(res)
      if (res.data.code === 0) {
        setInfo(res.data.data)  
      }
    }
  }
  const toAirDrop = () => {
    router.push('/AirDrop')
  }
  useEffect(() => {
    if (getCookie('myToken')) {
      getAirdrop()  
    }
  },[router.query.airdrop])
  return (
    <>
      <Container maxW={'1200px'} mx={'auto'} mt={'40px'}>
        <InfoHead />
        <hr />
        <InfoBody info={info} />
        <Box mt={'10px'} textAlign={'right'}>
          <Button onClick={toAirDrop} >Back</Button>
        </Box>
        
        
      </Container>
    </>
  )
}
export default AirdropInfo
import { Container,Box,Stack,Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import nft from "../../apis/nft"
import NextLink from "next/link"
import { getCookie } from "../../utils/cookie"

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
  useEffect(() => {
    if (getCookie('myToken')) {
      getAirdrop()  
    }
    
  },[router.query.airdrop])
  return (
    <>
      <Container maxW={'1200px'} mx={'auto'} mt={'40px'}>
        <Box display={'flex'} textAlign={'center'} mb={'10px'}>
          <Box w={'10%'}>Id</Box>
          <Box w={'10%'}>Main Net</Box>
          <Box w={'30%'}>Public Key</Box>
          <Box w={'10%'}>State</Box>
          <Box w={'10%'}>Token Id</Box>
          <Box w={'10%'}>Amount</Box>
          <Box w={'20%'}>TX Hash</Box>
        </Box>
        <hr />
        {info.map((data: any, index: any) => (
          <Box
            borderRadius={'15px'}
            p={'5px'}
            border={'1px solid black'}
            fontSize={'12px'}
            display={'flex'}
            key={data.id}
            textAlign={'center'}
            mt={'10px'}
          >
            <Box w={'10%'}>{data.id}</Box>
            <Box w={'10%'}>MainNet</Box>
            <Box w={'30%'}>{data.publicKey}</Box>
            <Box w={'10%'}>{data.state}</Box>
            <Box w={'10%'}>{data.tokenId}</Box>
            <Box w={'10%'}>{data.amount}</Box>
            
            {!data.txHash
              ? <Box w={'20%'}>null</Box>
            : 
            <NextLink href={data.txHash} passHref>
              <Link
                  overflowX={'hidden'}
                  color='blue.500'
                  w={'20%'}
              >{(data.txHash).substr(0, 20) + '...'}
                </Link>
            </NextLink>
            }
              
            
          </Box>
        ))}
        
      </Container>
    </>
  )
}
export default AirdropInfo
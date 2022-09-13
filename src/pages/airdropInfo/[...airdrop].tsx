import { Container,Box,Stack,Link, Button, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import nft from "../../apis/nft"
import { getCookie } from "../../utils/cookie"
import InfoBody from "../../components/airdrop/Info/InfoBody"
import InfoHead from "../../components/airdrop/Info/InfoHead"
import PaginationFunc from "../../components/utils/PaginationFunc";
import fileDownload from "js-file-download"

const {getAirdropInfo, exportFile, runAirDrop} = nft()
const AirdropInfo = (props:any) => {
  const router = useRouter()
  const [info, setInfo] = useState<any>([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('ASC')
  const [dataLength, setDataLength] = useState(0)
  const [success, setSuccess] = useState(false)

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
    if (getCookie('myToken')) {
      getAirdrop()  
    }
  }, [router.query.airdrop])
  
  //pagination
  const handlePageChange = (page: any) => {
    setPage(page)
  }

  // export button
  const downloadFile = async () => {
    console.log(router.query.airdrop)
    await exportFile(router.query.airdrop).then((res) => {
      console.log(res)
      fileDownload(res.data,'airdrop.csv')
    })
  }

  // run button
  const onAirDrop = async () => {
    await runAirDrop(router.query.airdrop).then((res) => {
      if(res.data.data.taskIds.length==0){
        // openPKeyModal.value = true
        // confirmReAirDrop.value = false
      }else {
        // confirmReAirDrop.value = true
        // openPKeyModal.value = false
      }
    })
  }
  return (
    <>
      <Container maxW={'1200px'} mx={'auto'} mt={'40px'}>
        <InfoHead
          onAirDrop={onAirDrop}
          downloadFile={downloadFile}
          toAirDrop={toAirDrop}
          success={success}
        />
        <hr />
        <InfoBody info={info} />
        
        <Flex justifyContent={'center'}>
          <PaginationFunc page={page} dataLength={dataLength} activePage={handlePageChange} />
        </Flex>
      </Container>
    </>
  )
}
export default AirdropInfo
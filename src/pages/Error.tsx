import { Box, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import error from "../apis/error"

export default function Error() {
  const {getError} = error()
  const [errData, setErrData] = useState<any>([])
  
  useEffect(() => {
    getErrorMsg()
  }, [])
  const getErrorMsg = async () => {  
    const res = await getError()
    console.log(res.data)
    setErrData({...res.data})
  }
  console.log(errData)
  return (
    <>
      <Box
        w={'80%'}
        mx={'auto'}
        mt={'30px'}
      >
      {Object.entries(errData).map((data: any, index: Number) => { 
        return (
          <Flex
            border={'1px solid black'}
            borderRadius={'20px'}
            textAlign={'center'}
            fontSize={'15px'}
            mt={'5px'}
            key={data}
          >
            <Box w={'80%'}>
              {data[0]}
            </Box>
            <Box w={'20%'}>
              {data[1]}
            </Box>
          </Flex>
        )
      })}
      </Box>
    </>
  )
}
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
    setErrData((prevState:any) =>  ({...prevState, data:res.data})  )
    
  }
  console.log(errData.data)
  return (
    <>
      {Object.values(errData.data).map((data: any, index: Number) => { 
        <Box key={data}>
          {data}1
        </Box>  
      })}
      error
    </>
  )
}
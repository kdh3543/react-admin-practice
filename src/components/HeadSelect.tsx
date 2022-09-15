import { Box, useColorModeValue, Select } from '@chakra-ui/react'

export default function HeadSelect() {
  return (
    <>
      <Box
        bg={useColorModeValue('gray.200', 'gray.900')}
        display={'flex'}
        pl={'20px'}
        pt={'10px'}
      >
        <Select
          placeholder='==== 서비스 존 선택 ===='
          size={'sm'}
          backgroundColor={'white'}
          w={'220px'}
        >
          <option>LUXON</option>
          <option>게임</option>
        </Select>
        <Select
          placeholder='==== 게임 선택 ===='
          ml={'5px'} size={'sm'}
          backgroundColor={'white'}
          w={'180px'}
        >
          <option>LUXON 운영툴</option>
          <option>LUXON 에어드랍</option>
          <option>LUXON 로그추출</option>
          <option>Desperado B218</option>
        </Select>
      </Box>
    </>
  )
}
import { Input, Flex, Button, Box } from '@chakra-ui/react'
import { useState } from 'react'
export default function Search(props:any) {
  const [search, setSearch] = useState('')

  const searchAddr = (e: any) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <Flex position={'relative'} alignItems={'center'} justifyContent={'right'} w={'50%'}>
        <Input onChange={searchAddr} placeholder={'search address'} />
        <Button onClick={() => props.onSearch(search)}>Search</Button>
      </Flex>
    </>
  )
}
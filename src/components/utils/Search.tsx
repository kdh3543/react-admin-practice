import { Input, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'
export default function Search(props:any) {
  const [search, setSearch] = useState('')

  const searchAddr = (e: any) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <Flex alignItems={'center'} justifyContent={'right'}>
        <Input onChange={searchAddr} w={'50%'} placeholder={'search address'} />
        <Button onClick={() => props.onSearch(search)}>Search</Button>
      </Flex>
    </>
  )
}
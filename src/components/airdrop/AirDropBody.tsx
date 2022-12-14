import {
  Box,
  Button,
  Flex
} from '@chakra-ui/react'
import { useState } from 'react'
import slice from '../hooks/store/slice/nftSlice'
import { useDispatch } from 'react-redux'
import DeleteAirDropModal from '../modal/deleteModal'
import { useRouter } from "next/router";

const nftSlice = slice()
export default function AirDropBody(props: any) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [delId, setDelId] = useState('')
  
  // delete modal
  const openDelete = (e: any, index: any) => {
    e.stopPropagation();
    dispatch(nftSlice.deleteSlice.actions.open(true))
    setDelId(index)
  }
  const closeModal = () => {
    dispatch(nftSlice.deleteSlice.actions.open(false))
  }
  
  const openAirdrop = (id: any) => {
    router.push({
      pathname: `/airdropInfo/${id}`,
      query: {
        id
      },
    },`/airdropInfo/${id}`)
  }
  
  return (
    <>
      {props.list.map((data: any, index: Number) => (
        <Flex
          onClick={() => openAirdrop(data.id)}
          cursor={'pointer'}
          alignItems={'center'}
          key={data.id}
          textAlign={'center'}
          mt={'10px'}
          border={'1px solid black'}
          borderRadius={'15px'}
          fontSize={'13px'}
          p={'5px'}
        >
          <Box w={'5%'}>{data.id}</Box>
          <Box w={'20%'}>{data.title}</Box>
          <Box w={'15%'}>{data.contractName}</Box>
          <Box w={'10%'}>{data.targetCount}</Box>
          <Box w={'25%'}>{data.createdAt}</Box>
          <Box w={'10%'}>{data.state}</Box>
          <Box w={'15%'}>
            <Button
              onClick={(e) => openDelete(e,data.id)}
              cursor={'default'}
              borderRadius={'10px'}
              colorScheme='red'
              size='sm'
            >
              Delete
            </Button>
            <DeleteAirDropModal
              delId={delId}
              closeModal={closeModal}
              onDelete={(id:any) => props.onDelete(id)}
            />
          </Box>
        </Flex>
      ))}
      
    </>
  )
}
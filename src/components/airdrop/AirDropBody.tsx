import {
  Box,
  Button,
  Flex
} from '@chakra-ui/react'
import { useState } from 'react'
import slice from '../hooks/store/slice/deleteSlice'
import { useSelector, useDispatch } from 'react-redux'
import DeleteAirDropModal from '../modal/deleteAirDropModal'
import nft from '../../apis/nft'
import { useRouter } from "next/router";

const { deleteAirDrop } = nft()
const reduxSlice = slice()
export default function AirDropBody(props: any) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [delId, setDelId] = useState('')
  
  const openDelete = (index:any) => {
    dispatch(reduxSlice.deleteSlice.actions.open(true))
    setDelId(index)
  }
  const closeModal = () => {
    dispatch(reduxSlice.deleteSlice.actions.open(false))
  }

  const onDelete = async (id: any) => {
    console.log(props.onDelete())
    console.log(id)
    // dispatch(deleteSlice.actions.open(false))
    
    // await deleteAirDrop(id).then((res) => {
    //   dispatch(deleteSlice.actions.open(false))
      
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  const openAirdrop = (id: any) => {
    router.push({
      pathname: `/airdrop/${id}`,
      query: {
        id
      },
    },`/airdrop/${id}`)
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
          p={'5px'}
        >
          <Box w={'5%'}>{data.id}</Box>
          <Box w={'20%'}>{data.title}</Box>
          <Box w={'10%'}>{data.contractId}</Box>
          <Box w={'15%'}>{data.targetCount}</Box>
          <Box w={'25%'}>{data.createdAt}</Box>
          <Box w={'10%'}>{data.state}</Box>
          <Box w={'15%'}>
            <Button
              onClick={() => openDelete(data.id)}
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
              onDelete={() => props.onDelete(props.delId)}
            />
          </Box>
        </Flex>
      ))}
      
    </>
  )
}
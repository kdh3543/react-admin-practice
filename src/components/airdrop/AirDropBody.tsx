import {
  Box,
  Button,
  color,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  CloseButton
} from '@chakra-ui/react'
import { useState } from 'react'
import nft from '../../apis/nft'
import { open } from '../hooks/store/slice/deleteSlice'
import { useSelector, useDispatch } from 'react-redux'
import DeleteAirDropModal from '../modal/deleteAirDropModal'

const {deleteAirDrop} = nft()
export default function AirDropBody(props:any) {
  const dispatch = useDispatch()
  const [delId, setDelId] = useState(0)
  
  const openDelete = async () => {
    
    dispatch(open(true))
    setDelId(props.data.id)
    console.log(props.data.id)
  }
  const closeModal = () => {
    dispatch(open(false))
    console.log(delId)
  }
  const onDelete = async (id:any) => {
    console.log(id)
    // const res = await deleteAirDrop(props.data.id)
    // console.log(res)
  }
  const modalOpen = useSelector((state:any) => {
    return state.openDelete.value
  })
  
  return (
    <>
      <Box w={'5%'}>{props.data.id}</Box>
      <Box w={'20%'}>{props.data.title}</Box>
      <Box w={'10%'}>{props.data.contractId}</Box>
      <Box w={'15%'}>{props.data.targetCount}</Box>
      <Box w={'25%'}>{props.data.createdAt}</Box>
      <Box w={'10%'}>{props.data.state}</Box>
      <Box w={'15%'}>
        <Button onClick={openDelete} cursor={'default'} borderRadius={'10px'} colorScheme='red' size='sm'>
          Delete
        </Button>
        {/* <DeleteAirDropModal closeModal={closeModal} onDelete={onDelete}/> */}
        <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalOverlay backgroundColor={'blackAlpha.100'}/>
        <ModalContent
          w={'402px'}
          h={'280px'}
          pt={'38px'}
          px={'25px'}
          pb={'30px'}
          borderRadius={'10px'}
          alignSelf={'center'}
        >
          <ModalBody p={'0px'} m={'0px'}>
            <Flex flexDir={'column'} align={'center'} justify={'center'}>
              <CloseButton onClick={closeModal} position={'absolute'} top={'5px'} right={'5px'}/>
              <Text fontWeight={'extrabold'} color={'primary.500'}>
                {'DELETE AIRDROP LIST'}
              </Text>
              <Text mt={'50px'} fontSize={'20px'}>
                {'ARE YOU SURE DELETE LIST?'}
              </Text>
              <Button onClick={onDelete(delId)} mt={'50px'}>
                DELETE
              </Button>
              
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      </Box>
    </>
  )
}
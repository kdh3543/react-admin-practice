import {
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
} from "@chakra-ui/react";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import slice from "../hooks/store/slice/nftSlice";

export default function DeleteAirDropModal(props: any) {
  const reduxSlice = slice()
  const dispatch = useDispatch()
  const modalOpen = useSelector((state: any) => {
    return state.openDelete.value
  })
  const delId = useSelector((id: any) => {
    return id
  })
 
  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => { props.closeModal() }}>
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
            <Flex
              flexDir={'column'}
              align={'center'}
              justify={'center'}
            >
              <CloseButton
                onClick={() => { props.closeModal() }}
                position={'absolute'}
                top={'5px'}
                right={'5px'}
              />
              <Text fontWeight={'extrabold'} color={'primary.500'}>
                {'DELETE LIST'}
              </Text>
              <Text mt={'50px'} fontSize={'20px'}>
                {'ARE YOU SURE DELETE LIST?'}
              </Text>
              <Button
                onClick={() => props.onDelete(props.delId)}
                mt={'50px'}
              >
                DELETE
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
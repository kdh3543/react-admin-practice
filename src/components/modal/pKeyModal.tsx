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
  CloseButton,
  Input
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from 'react-redux'

export default function PKeyModal(props: any) {
  const [pKey, setPKey] = useState('')
  // modal status boolean
  const modalOpen = useSelector((state: any) => {
    return state.openPModal.value
  })

  // input private key
  const inputPKey = (e: any) => {
    setPKey(e.target.value)
  }
  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => { props.closeModal() }}>
        <ModalOverlay backgroundColor={'blackAlpha.400'}/>
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
                {'Input Private Key'}
              </Text>
              <Input onInput={inputPKey} mt={'50px'} placeholder="Input Private Key" />
              {props.rightPKey
                ? <Text color={'red'}>
                    {props.pKeyError}
                  </Text>
                : ''
              }
              
              <Button
                onClick={() => props.onRun(pKey)}
                mt={'50px'}
              >
                RUN
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
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

export default function DbImportModal(props: any) {
  const [file, setFile] = useState('')

  // modal status boolean
  const modalOpen = useSelector((state: any) => {
    return state.openImportModal.value
  })
  
  // file select
  const choiceFile = (e:any) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
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
              <Text
                fontSize={'20px'}
                fontWeight={'extrabold'}
                color={'primary.500'}
              >
                {'Import User'}
              </Text>
              <Input
                type={'file'}
                border={'none'}
                mt={'50px'}
                alignItems={'center'}
                onChange={choiceFile}
              />
              <Button
                w={'100%'}
                colorScheme={'purple'}
                mt={'50px'}
                onClick={() => props.onRegister(file)}
              >
                Register
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
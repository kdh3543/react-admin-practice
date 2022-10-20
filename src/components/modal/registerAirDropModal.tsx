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
  Input,
  Select
} from "@chakra-ui/react";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import nft from "../../apis/nft";

const {getContractLists} = nft()
export default function RegisterAirDropModal(props: any) {
  const [contractData, setContractData] = useState<any>([])

  // register modal
  const modalOpen = useSelector((state: any) => {
    return state.openRegister.value
  })

  // get contract list
  const getContractList = async () => {
    await getContractLists().then((res:any) => {
      // console.log(res)
      return setContractData(res.data.data)
    })
  }
  
  useEffect(() => {
    getContractList()
  }, [])
  
  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => { props.closeModal() }}>
        <ModalOverlay backgroundColor={'blackAlpha.500'}/>
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
              <CloseButton onClick={() => { props.closeModal() }} position={'absolute'} top={'5px'} right={'5px'}/>
              <Text fontWeight={'extrabold'} color={'primary.500'}>
                {'REGISTER TASK LIST'}
              </Text>
              <Input
                mt={1}
                placeholder="input task title"
                onChange={(e) => props.writeTitle(e)}
              />
              <Select
                mt={2}
                placeholder="Select Contract"
                onChange={(e) => props.choiceContract(e)}
              >
                {contractData.map((list: any, index: any) => (
                  <option key={index} value={list.name}>
                    {list.name}
                  </option>  
                ))}
              </Select>
              <Input
                onChange={(e) => props.choiceFile(e)}
                border={'none'}
                mt={2}
                type='file'
              />
            </Flex>
          </ModalBody>
          <Button
            onClick={() => { props.registerTask() }}
            colorScheme='purple'
          >Register</Button>
        </ModalContent>
      </Modal>
    </>
  )
}
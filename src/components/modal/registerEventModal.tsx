import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  CloseButton,
  Input,
  Select,
  Box
} from "@chakra-ui/react";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";

import typeData from "../event/data/data";


export default function RegisterEventModal(props: any) {
  
  // register modal
  const modalOpen = useSelector((state: any) => {
    return state.openRegister.value
  })
  
  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => { props.closeModal() }}>
        <ModalOverlay backgroundColor={'blackAlpha.500'}/>
        <ModalContent
          w={'402px'}
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
                {'REGISTER EVENT LIST'}
              </Text>
              <Select
                size='sm'
                mt={2}
                placeholder="Select Type"
                onChange={(e) => props.choiceType(e)}
              >
                {typeData.typeLists.map((list: any, index: any) => (
                  <option key={index} value={list}>
                    {list}
                  </option>  
                ))}
              </Select>
              <Select
                size='sm'
                mt={2}
                placeholder="Select SubType"
                onChange={(e) => props.choiceSubType(e)}
              >
                {props.type === 'AIRDROP_HERO'
                  ? typeData.subTypeHero.map((list: any, index: any) => (
                    <option key={index} value={list}>
                      {list}
                    </option>  
                  ))
                  : props.type === 'AIRDROP_VALUE_CHIP'?
                  typeData.subTypeValueChip.map((list: any, index: any) => (
                    <option key={index} value={list}>
                      {list}
                    </option>  
                  ))
                  : ''
                }
              </Select>
              <Input
                size='sm'
                onChange={(e) => props.writeToken(e)}
                placeholder={'tokenId'}
                mt={2}
              />
              <Input
                size='sm'
                onChange={(e) => props.writeAmount(e)}
                placeholder={'amount'}
                mt={2}
              />
              <Input
                size='sm'
                onChange={(e) => props.writeMaxCount(e)}
                placeholder={'maxApplyCount'}
                mt={2}
              />
              <Select
                size='sm'
                mt={2}
                placeholder="Select Contract"
                onChange={(e) => props.choiceContract(e)}
              >
                {props.contractData.map((list: any, index: any) => (
                  <option key={index} value={list.id}>
                    {list.name}
                  </option>  
                ))}
              </Select>
              <Input
                size='sm'
                onChange={(e) => props.writeEventId(e)}
                placeholder={'preconditionEventId'}
                mt={2}
              />
              <Input
                type={'date'}
                size='sm'
                onChange={(e) => props.choiceStart(e)}
                placeholder={'preconditionEventId'}
                mt={2}
              />
              <Input
                disabled={props.startDate?false:true}
                min={props.startDate}
                type={'date'}
                size='sm'
                onChange={(e) => props.choiceEnd(e)}
                placeholder={'preconditionEventId'}
                mt={2}
              />
            </Flex>
          </ModalBody>
          {props.error ?
            <Box textAlign={'center'} color={'red'} >
              input all information except eventId
            </Box>
            : ''
          }
          <Button
            mt={2}
            onClick={() => { props.onRegister() }}
            colorScheme='purple'
          >Register</Button>
        </ModalContent>
      </Modal>
    </>
  )
}
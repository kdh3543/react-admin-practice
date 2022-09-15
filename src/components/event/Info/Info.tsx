import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  HStack,
  VStack,
  UnorderedList,
  List,
  ListItem,
  ListIcon,
  Select,
  Flex,
  Container,
  Input,
  Button
} from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import data from '../data/data';
import { useRouter } from "next/router";
import eventApis from '../../../apis/event';


export default function Info(props: any) {
  const router = useRouter()
  const [type, setType] = useState('')
  const [startAt, setStartAt] = useState(null)

  // update info
  const selectType = (e: any) => {
    setType(e.target.value)
    props.infoData.type = e.target.value
  }
  const selectSubType = (e: any) => {
    props.infoData.subType = e.target.value
  }
  const selectActive = (e: any) => {
    if (e.target.value === 'true') {
      props.infoData.active = true
    } else {
      props.infoData.active = false
    }
  }
  const choiceStart = (e: any) => {
    props.infoData.startAt = e.target.value
    setStartAt(e.target.value)
  }
  const choiceEnd = (e: any) => {
    props.infoData.endAt = e.target.value
  }
  const writeToken = (e: any) => {
    props.infoData.tokenId = e.target.value
  }
  const writeAmount = (e: any) => {
    props.infoData.amount = e.target.value
  }
  const writeMaxCount = (e: any) => {
    props.infoData.tokenId = e.target.maxApplyCount
  }
  const writeCount = (e: any) => {
    props.infoData.tokenId = e.target.applyCount
  }
  const writeEventId = (e: any) => {
    props.infoData.tokenId = e.target.preconditionEventId
  }

  // const updateInfo = async () => {
  //   await updateEvent(props.infoData).then((res:any) => {
  //     console.log(res)
  //   })
  // }

  const PriceWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: 'center', lg: 'flex-start' }}
        borderColor={useColorModeValue('gray.200', 'gray.500')}
        borderRadius={'xl'}>
        {children}
      </Box>
    );
  }
  
  return (
    <Container mt={'30px'}>
        <PriceWrapper>
          <Box fontWeight={'bold'} fontSize={'20px'} mt={'20px'} textAlign={'center'}>EVENT INFO</Box>
          <Box mx={'auto'} mt={'20px'} mb={'20px'} w={'70%'}>
              <UnorderedList mx={'auto'} fontSize={'15px'}>
                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >id: </Text>
                  {props.infoData.id}
                </ListItem>
              
                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >type: </Text>
                  {props.infoData.type}
                  <Select
                    placeholder='Select Type'
                    size='sm'
                    onChange={selectType}
                  >
                    {data.typeLists.map((list:any,index:any)=>(
                      <option key={index} value={list}>
                        {list}
                      </option>
                    ))}
                  </Select>
                </ListItem>
            
                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >subType: </Text>
                  {props.infoData.subType}
                  <Select
                    placeholder='Select subType'
                    size='sm'
                    onChange={selectSubType}
                  >
                    {type === 'AIRDROP_HERO'
                      ? data.subTypeHero.map((list: any, index: any) => (
                        <option key={index} value={list}>
                        {list}
                      </option> 
                      ))
                      : type === 'AIRDROP_VALUE_CHIP' ?
                        data.subTypeValueChip.map((list: any, index: any) => (
                          <option key={index} value={list}>
                            {list}
                          </option> 
                        ))
                      : ''
                    }
                  </Select>
                </ListItem>
                
            
                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >tokenId: </Text>
                  <Input
                    defaultValue={props.infoData.tokenId}
                    onChange={(e)=>writeToken(e)}
                    _placeholder={{color:'black'}}
                    size='sm'
                    variant='filled'
                  />
                </ListItem>

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >amount: </Text>
                  <Input
                    onChange={writeAmount}
                    defaultValue={props.infoData.amount}
                    _placeholder={{color:'black'}}
                    size='sm'
                    variant='filled'
                  />
                </ListItem>

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >maxApplyCount: </Text>
                  <Input
                    onChange={writeMaxCount}
                    defaultValue={props.infoData.maxApplyCount}
                    _placeholder={{color:'black'}}
                    size='sm'
                    variant='filled'
                  />
                </ListItem>

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >active: </Text>
                  {props.infoData.active ? 'true' : 'false'}
                  <Select
                    onChange={selectActive}
                    placeholder='Select Active'
                    size='sm'
                  >
                    <option>true</option>
                    <option>false</option>
                  </Select>
                </ListItem>
                

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >applyCount: </Text>
                  <Input
                    onChange={writeCount}
                    defaultValue={props.infoData.applyCount}
                    _placeholder={{color:'black'}}
                    size='sm'
                    variant='filled'
                  />
                </ListItem>

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >preconditionEventId: </Text>
                  <Input
                    onChange={writeEventId}
                    defaultValue={props.infoData.preconditionEventId}
                    _placeholder={{color:'black'}}
                    size='sm'
                    variant='filled'
                  />
                </ListItem>

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >startAt: </Text>
                    {props.infoData.startAt}
                  <Input
                    w={'55%'}
                    ml={'5px'}
                    type={'date'}
                    size='sm'
                    onChange={choiceStart}
                    defaultValue={'preconditionEventId'}
                  />
                </ListItem>
                

                <ListItem mt={2} display={'flex'} alignItems={'center'}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  <Text mr={'5px'} fontWeight={'bold'} >endAt: </Text>
                  {props.infoData.endAt}
                  <Input
                    ml={'5px'}
                    w={'55%'}
                    type={'date'}
                    size='sm'
                    onChange={choiceEnd}
                    min={startAt}
                    defaultValue={'preconditionEventId'}
                  />
                </ListItem>
              </UnorderedList>
          </Box>
          <Box justifyContent={'center'} display={'flex'} mb={2}>
            <Button onClick={() => props.updateInfo(props.infoData)}>Update</Button>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
          </VStack>
        </PriceWrapper>
    </Container>
  )
}

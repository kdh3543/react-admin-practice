import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';

const ConnectPage = (props: any) => {
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
  const listArray = ['id', 'userId', 'account', 'activatedAt', 'type', 'authentication','createdAt','updatedAt','deletedAt','ttl'];

  return (
    <>
      {props.connectDatas ? <Box>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}>
          <PriceWrapper>
            <Box py={5} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Connect
              </Text>
              <HStack justifyContent="center">
                <List spacing={5} textAlign="start" px={12}>
                  {listArray.map((v: any) => {
                    return (
                      <ListItem
                        key={v}
                        backgroundColor={
                          v === 'account' ? 'yellow'
                            : v === 'activatedAt' ? 'yellow'
                              : ''
                        }
                      >
                        <ListIcon as={FaCircle} color="gray.400" />
                        {v}: {props.connectDatas[v] ? props.connectDatas[v] : "null"}
                      </ListItem>
                    )
                  })
                  }
                </List>
              </HStack>
            </Box>
            <VStack
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Box> :
       <Box mt={'20px'} mb={'20px'}>It is not Connected</Box> 
      }
      
    </>
    
  )
}


export default ConnectPage;
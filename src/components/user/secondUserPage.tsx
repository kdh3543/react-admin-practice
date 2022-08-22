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
import { ReactNode } from 'react';
import { FaCircle } from 'react-icons/fa';

const SecondUserPage = (props:any) => {

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
  console.log(props);
  const listArray = ['id', 'address', 'createdAt', 'updatedAt', 'deletedAt', 'droppedAt'];

  return (
    <Box py={12}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={5} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              세부정보
            </Text>
            <HStack justifyContent="center">
              <List spacing={5} textAlign="start" px={12}>
                {listArray.map((v: any) => {
                  return (
                    <ListItem>
                      <ListIcon as={FaCircle} color="gray.400" />
                      {v}: {props.user[v] ? props.user[v] : "null"}
                    </ListItem>
                  )
                })
                }
              </List>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  )
}


export default SecondUserPage;
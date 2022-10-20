import {
  Heading,
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  HStack,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const ProfilePage = (props: any) => {
  const listArray = ['id', 'userId', 'createdAt', 'updatedAt', 'deletedAt'];
  
  return (
    <Box
      maxW={'600px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      textAlign="center"
      mt={'30px'}
      mb={'30px'}
    >
    <Text mt={'10px'} fontWeight="500" fontSize="2xl">
      Profile
    </Text>
    <Box
    h={'120px'}
    w={'full'}
    objectFit={'cover'}
    />
    <Flex justify={'center'} mt={-20}>
      <Avatar
        size={'xl'}
        src={ props.profile['profileImageUrl'] }
        css={{
          border: '2px solid white',
        }}
        />
    </Flex>
      
      <Box py={5} px={12}>
        <Text fontWeight="500" fontSize="2xl">
          {props.profile['username'] ? props.profile['username'] : 'null'}
        </Text>
        <HStack justifyContent="center">
          <List spacing={5} textAlign="start" px={12}>
            {listArray.map((v: any) => {
              return (
                <ListItem key={v}>
                  <ListIcon as={FaCircle} color="gray.400" />
                  {v}: {props.profile[v] ? props.profile[v] : "null"}
                </ListItem>
              )
            })
            }
          </List>
        </HStack>
      </Box>
  </Box>
  )
}

export default ProfilePage;
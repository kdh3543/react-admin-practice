import {
  Heading,
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';


const UserInfoPage = (prop:any) => {

  return (
    <Box
    maxW={'270px'}
    w={'full'}
    bg={useColorModeValue('white', 'gray.800')}
    boxShadow={'2xl'}
    rounded={'md'}
    overflow={'hidden'}>
    <Box
      h={'120px'}
      w={'full'}
      objectFit={'cover'}
    />
    <Flex justify={'center'} mt={-20}>
      <Avatar
        size={'xl'}
        src={ prop.img }
        css={{
          border: '2px solid white',
        }}
      />
    </Flex>

    <Box p={6}>
      <Stack spacing={0} align={'center'} >
        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
          { prop.name === null ? 'null' : prop.name}
        </Heading>
        <Text color={'gray.500'} fontSize={'12px'}>생성일 {prop.createdAt}</Text>
      </Stack>

      <Stack direction={'row'} justify={'center'} spacing={6}>
        <Stack spacing={0} align={'center'}>
          <Text fontWeight={600}>상태</Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            {!prop.connects.length ? "연동 안됨" : "연동 됨"}
          </Text>
        </Stack>
      </Stack>
    </Box>
  </Box>
  )
}

export default UserInfoPage;
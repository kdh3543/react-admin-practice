import { Box, Button } from "@chakra-ui/react"
export default function UserBody(props:any) {
  return (
    <Box mt={2}>
      {props.userData.map((data:any, index:Number) => (
        <Box
          key={data.id}
          display={'flex'}
          alignItems={'center'}
          borderRadius={'15px'}
          p={3}
          mt={2}
          border={'1px solid black'}
          textAlign={'center'}
          cursor={'pointer'}
          onClick={() => { props.moveInfo(data.id) }}
          fontSize={'13px'}
        >
          <Box w={'10%'} >{data.id}</Box>
          <Box w={'30%'} overflowX={'hidden'}>{data.address}</Box>
          <Box w={'20%'}>{data.createdAt}</Box>
          <Box w={'20%'}>{data.droppedAt ? data.deletedAt : 'null'}</Box>
          <Box w={'20%'}>{data.updatedAt}</Box>
        </Box>
      ))}
    </Box>
  )
}
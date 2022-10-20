import { Box,Button } from '@chakra-ui/react'
import { useRouter } from "next/router";

export default function Admins(props: any) {
  const router = useRouter()
  
  const openAdminInfor = (id: any) => {
    router.push({
      pathname: `/adminInfo/${id}`,
      query: {
        id
      }
    },`/adminInfo/${id}`)
  }
  
  return (
    <Box mt={3}>
      {props.adminData.map((data:any, index:Number) => (
        <Box
          key={data.id}
          display={'flex'}
          alignItems={'center'}
          borderRadius={'15px'}
          p={2}
          mt={2}
          border={'1px solid black'}
          textAlign={'center'}
          cursor={'pointer'}
          onClick={() => { openAdminInfor(data.id) }}
          fontSize={'13px'}
        >
          <Box w={'10%'}>{data.id}</Box>
          <Box w={'20%'}>{data.email}</Box>
          <Box w={'20%'}>{data.createdAt}</Box>
          <Box w={'20%'}>
            {data.activatedAt ? data.activatedAt : 'null'}
          </Box>
          <Box w={'15%'}>{data.roles}</Box>
          <Box w={'15%'}>
            {data.activatedAt ? 
              <Button
                onClick={(e) => props.onActivate(e, data.id, index)}
                cursor={'default'}
                colorScheme='whatsapp'
                size='sm'
              >
                Activated
              </Button>
              : 
              <Button
                cursor={'default'}
                onClick={(e) => props.onActivate(e, data.id, index)}
                colorScheme='red'
                size='sm'
              >
                UnActivated
              </Button>
            }
          </Box>
        </Box>
      ))}
    </Box>
  )
}
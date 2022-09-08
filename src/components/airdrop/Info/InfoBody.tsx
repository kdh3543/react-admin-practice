import { Box, Link } from '@chakra-ui/react'
import NextLink from "next/link"

export default function InfoBody(props: any) {
  return (
    <>
    {props.info.map((data: any, index: any) => (
          <Box
            borderRadius={'15px'}
            p={'5px'}
            border={'1px solid black'}
            fontSize={'12px'}
            display={'flex'}
            key={data.id}
            textAlign={'center'}
            mt={'10px'}
          >
            <Box w={'10%'}>{data.id}</Box>
            <Box w={'10%'}>MainNet</Box>
            <Box w={'30%'}>{data.publicKey}</Box>
            <Box w={'10%'}>{data.state}</Box>
            <Box w={'10%'}>{data.tokenId}</Box>
            <Box w={'10%'}>{data.amount}</Box>
            
            {!data.txHash
              ? <Box w={'20%'}>null</Box>
            : 
            <NextLink href={data.txHash} passHref>
              <Link
                  overflowX={'hidden'}
                  color='blue.500'
                  w={'20%'}
              >{(data.txHash).substr(0, 20) + '...'}
                </Link>
            </NextLink>
            }
          </Box>
        ))}
    </>
  )
}
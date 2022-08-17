import styles from '/styles/Toolbar.module.css'
import NextLink from 'next/link';
import { Link, Text, Flex, HStack } from '@chakra-ui/react'

export default function Toolbar() {
  return (
    <HStack spacing={'24px'}>
      <Flex
        w={'100%'}
        h={'80px'}
        align={'center'}
        bgColor={'white'}
        border={'1px solid black'}
        pos={'fixed'}
        top={0}
      >
        <NextLink href={'/'}>
          <Link isExternal>
            <Text>
              home
            </Text>
            
          </Link>
        </NextLink>
        <NextLink href={'/'}>
          <Link isExternal>
            <Text>
              home2
            </Text>
          </Link>
        </NextLink>
      </Flex>
    </HStack>
    
  )
}
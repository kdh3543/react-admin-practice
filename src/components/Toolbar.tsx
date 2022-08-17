import styles from '/styles/Toolbar.module.css'
import Link from 'next/link';
import { Text, Flex, HStack } from '@chakra-ui/react'

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
        <Link href={'/'}>
          <a>
            <Text>
              home
            </Text>
          </a>
        </Link>
        <Link href={'/test'}>
          <a>
            <Text>
              home2
            </Text>
          </a>
        </Link>
      </Flex>
    </HStack>

  )
}
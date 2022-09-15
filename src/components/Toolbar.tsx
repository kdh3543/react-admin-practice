import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Router from 'next/router';

const Links = ['Admins', 'Users', 'AirDrop', 'Event', 'Error'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'none',
      backgroundColor:'gray'
    }}
    textAlign={'center'}
    fontWeight={'bold'}
    href={`/${children}`}>
    {children}
  </Link>
);

export default function Simple() {
  const logout = () => {
    localStorage.clear()
    Router.push({
      pathname: '/'
    })
  };

  const [toolbarRender, setToolbarRender] = useState(true);

  useEffect(() => {
    if( localStorage.getItem('mytoken') ) {
      setToolbarRender(false);
    }else {
      setToolbarRender(true);
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link
                _hover={{
                  textDecoration: 'none',
                  bg: 'none',
                }}
                href={toolbarRender ? '/' : 'Admins'}
                display={'flex'}
              >
                <Image
                  w={'185px'}
                  h={'40px'}
                  src='/images/Logo/logo.png'
                  alt={'logo image'}
                />
              </Link>
            </Box>
            {toolbarRender ? '' : (<HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink
                  key={link}
                >
                  {link}
                </NavLink>
              ))}
            </HStack>)}
          </HStack>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {toolbarRender ?
                <Link
                  px={2}
                  py={2}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'none',
                    backgroundColor:'gray'
                  }}
                  fontWeight={'bold'}
                  href='/'
                >
                  Login
                </Link> :
                <Link
                  px={2}
                  py={2}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'none',
                    backgroundColor:'gray'
                  }}
                  fontWeight={'bold'}
                  onClick={logout}
                  href='/'
                >
                  LOGOUT
                </Link>
              }
            </HStack>
          </HStack>
        </Flex>
        
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
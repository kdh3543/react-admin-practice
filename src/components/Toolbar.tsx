import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Cookies } from 'next/dist/server/web/spec-extension/cookies';
import { getCookie, setCookie } from '../utils/cookie';
import axios from 'axios';
import Router from 'next/router';

const Links = ['admins', 'users', 'Team'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'none',
    }}
    href={`/${children}`}>
    {children}
  </Link>
);

export default function Simple() {
  const logout = () => {
    setCookie('token','')
    Router.push({
      pathname: '/'
    })
  }
  axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdDEyMzRAbmF2ZXIuY29tIiwicm9sZXMiOiJBRE1JTiIsImFjdGl2YXRlZEF0IjoiMjAyMi0wNS0xN1QwODozNjo1NC4wMDBaIiwiaWF0IjoxNjYwODk3NzY2LCJleHAiOjE2NjM0ODk3NjZ9.cMs3ECnAfpNLzrxUSP_joTLSgvWuEywVsdq2xrKwmr0`
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const cook = getCookie('token')
  // console.log(cook)
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        
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
                href='/'
              >
                Logo
              </Link>
            </Box>
            {true ? (<HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>): ''}
            
          </HStack>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {true ?
                <Link
                  px={4}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'none',
                  }}
                  href='/'
                >
                  Login
                </Link> :
                <Link
                  px={4}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'none',
                  }}
                  
                  onClick={logout}
                >
                  Logout
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
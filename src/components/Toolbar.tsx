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
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Cookies } from 'react-cookie';

const cookies = new Cookies()
const links = ['Admins', 'Users', 'AirDrop', 'Event', 'Error'];

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

export default function Toolbar() {
  const logout = () => {
    cookies.remove('mytoken')
    
    // Router.push({
    //   pathname: '/'
    // })
  };

  const [toolbarRender, setToolbarRender] = useState(true);

  useEffect(() => {
    if( cookies.get('mytoken') ) {
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
              {links.map((link) => (
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
                <Box display={'flex'} alignItems={'center'}>
                  {/* <Text
                    mr={'5px'}
                    fontWeight={'normal'}
                    fontSize={'12px'}
                    opacity={'0.5'}
                  >
                    {email}
                  </Text> */}
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
                    display={'flex'}
                    alignItems={'center'}
                  >
                    
                    LOGOUT
                  </Link>
                </Box>
                
              }
            </HStack>
          </HStack>
        </Flex>
        
        {isOpen && !toolbarRender ?
          (
            <Box pb={4} display={{ md: 'none' }}>
              <Box pb={4} textAlign={'center'} display={'flex'} alignItems={'center'}>
                {/* <Text
                  w={'50%'}
                  mr={'5px'}
                  fontWeight={'normal'}
                  fontSize={'15px'}
                  opacity={'0.5'}
                >
                  {email}
                </Text> */}
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
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  w={'100%'}
                >
                  LOGOUT
                </Link>
              </Box>
              <Stack as={'nav'} spacing={4}>
                {links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          )
          :
          null}
      </Box>
    </>
  );
}
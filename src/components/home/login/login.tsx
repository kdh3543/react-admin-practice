import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/router';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    userPw: '',
  });

  const onChange = (e:any) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const LoginGetId = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('https://dev-admin.luxon.run/auth/login', { email: loginInfo.userId, password: loginInfo.userPw });
      router.push('/test');
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="55vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input name="userId" type="email" placeholder="이메일" value={loginInfo.userId} onChange={onChange} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    name="userPw"
                    type="password"
                    placeholder="비밀번호"
                    value={loginInfo.userPw}
                    onChange={onChange}
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={LoginGetId}
              >
                로그인
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;

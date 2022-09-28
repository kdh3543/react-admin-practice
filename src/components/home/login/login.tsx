import { useState } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useRouter } from 'next/router';
import member from "../../../apis/member";
import { useDispatch } from "react-redux";
import slice from "../../hooks/store/slice/memberSlice";
import { Cookies } from "react-cookie";
  
const cookies = new Cookies()

const { login } = member()
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const memberSlice = slice()
export default function Login() {
  const dispatch = useDispatch()
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    userPw: '',
  });
  const [error, setError] = useState(false)

  const onChange = (e:any) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const onLogin = async (e: any) => {
    e.preventDefault();
    if (!loginInfo.userId || !loginInfo.userPw) {
      setError(true)
      return false
    }
      
    setError(false)
    await login(loginInfo.userId, loginInfo.userPw).then((res:any) => {
      console.log(res)
      if (!res.data.data) {
        setError(true)
        return false
      }
      cookies.set('mytoken', res.data.data.authToken)
      dispatch(memberSlice.loginSlice.actions.login(res.data.data.email))
      setError(false)
      router.push('/Admins');  
      return true
    })
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
              {error
                ? <Box color={'red'} fontWeight={'bold'} textAlign={'center'}>IT IS WRONG INFORMATION</Box>
                : ''
              }
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={onLogin}
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




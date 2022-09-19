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
import axios from 'axios';
import { useRouter } from 'next/router';
import member from "../../../apis/member";
import { useDispatch } from "react-redux";
import slice from "../../hooks/store/slice/memberSlice";
  
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

  const LoginGetId = async (e: any) => {
    e.preventDefault();
    if (!loginInfo.userId || !loginInfo.userPw) {
      setError(true)
      return false
    } else {
      setError(false)
    }
    await login(loginInfo.userId, loginInfo.userPw).then((res:any) => {
      console.log(res)
      if (res.data.code === 0) {
        // const data = {
        //   value: res.data.data.authToken,
        //   expire: Date.now() + 100
        // }
        // if (Date.now() > data.expire) {
        //   localStorage.clear()
        //   console.log('end!!!')
        //   return false
        // }
        // localStorage.setItem('mytoken', JSON.stringify(data))
        dispatch(memberSlice.loginSlice.actions.login(res.data.data.email))
        localStorage.setItem('mytoken', res.data.data.authToken)
        setError(false)
        axios.defaults.headers.common['Authorization']=`Bearer ${res.data.data.authToken}`
        router.push('/Admins');

        // 자동 로그아웃
        setTimeout(() => {
          localStorage.clear()
          router.push('/')
        },60*60*3600)
      } else {
        setError(true)
        return false
      }
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




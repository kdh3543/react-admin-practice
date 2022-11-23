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
import LoginSuccessModal from "../../modal/loginSuccessModal";
  
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
  const [errorMsg, setErrorMsg] = useState('')

  const inputLoginInfo = (e:any) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const onLogin = async (e: any) => {
    e.preventDefault();
    if (!loginInfo.userId || !loginInfo.userPw) {
      setError(true)
      setErrorMsg('PLEASE INPUT LOGIN INFO')
      return false
    }

    setError(false)
    setErrorMsg('')
    await login(loginInfo.userId, loginInfo.userPw).then((res:any) => {
      console.log(res)
      if (!res.data.data) {
        setError(true)
        setErrorMsg(res.data.message)
        return false
      }
      cookies.set('mytoken', res.data.data.authToken)
      setError(false)
      setErrorMsg('')

      router.push({
        pathname: '/Admins'
      }, `/Admins`);  
      
      return true
    })
  }

  // const closeModal = () => {
  //   dispatch()
  // }

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
                  >
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input name="userId" type="email" placeholder="이메일" value={loginInfo.userId} onChange={inputLoginInfo} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  >
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="userPw"
                    type="password"
                    placeholder="비밀번호"
                    value={loginInfo.userPw}
                    onChange={inputLoginInfo}
                  />
                </InputGroup>
              </FormControl>
              {error
                ? <Box color={'red'} fontWeight={'bold'} textAlign={'center'}>{errorMsg}</Box>
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
              {/* <LoginSuccessModal
                delId={delId}
                closeModal={closeModal}
                onDelete={(id:any) => props.onDelete(id)}
              /> */}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};




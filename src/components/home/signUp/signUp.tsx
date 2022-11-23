import { useEffect, useRef, useState } from "react";
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
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import member from '../../../apis/member'
import memberApi from "../../../apis/member";

interface NumberType {
  userId: string | undefined,
  userPw: string | undefined,
  userPwCheck: string | undefined,
}

const {signup} = member()
export default function SignUp(prop:any) {
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CFaEnvelope = chakra(FaEnvelope);
  const canvas = useRef<any>(null);

  const [error, setError] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)
  // const [capchaNumber, setCapchaNumber] = useState<undefined | number>(undefined);
  const [signUpValue, setSignUpValue] = useState<NumberType>({
    userId: '',
    userPw: '',
    userPwCheck: ''
  });

  const valueOnChange = (e:any) => {
    const { value, name } = e.target; 
    setSignUpValue({ ...signUpValue, [name]: value });
  }

  const submitSignUp = async(e:any) => {
    e.preventDefault();
    
    // memberApi.signup({
      
    // })

    if (!signUpValue.userId || !signUpValue.userPw || !signUpValue.userPwCheck) {
      setErrorStatus(true)
      setError('must input all information')
      return false
    } else {
      if (signUpValue.userPw !== signUpValue.userPwCheck) {
        setErrorStatus(true)
        setError('please input same password')
        return false
      } 
      await signup(signUpValue.userId, signUpValue.userPw).then((res:any) => {
        console.log(res)
        if (res.data.code === 1002) {
          setErrorStatus(true)
          setError(res.data.message)
        } else {
          setErrorStatus(false)
          setError('')
          prop.signUp(true);
        }
      })
      return true
    }
    
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="75vh"
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
                    <CFaEnvelope color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name='userId'
                    type="email"
                    placeholder="이메일"
                    value={signUpValue.userId}
                    onChange={valueOnChange} />
                </InputGroup>
              </FormControl>
              {/* 이메일 */}
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
                    value={signUpValue.userPw} 
                    onChange={valueOnChange}
                  />
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
                    name="userPwCheck"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={signUpValue.userPwCheck} 
                    onChange={valueOnChange}
                  />
                </InputGroup>
              </FormControl>
              {/* 비밀번호 */}
              {errorStatus
                ?
                <Box
                  textAlign={'center'}
                  color={'red'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                >
                  {error}
                </Box>
                : ''
              }
              
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={submitSignUp}
              >
                회원가입
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};



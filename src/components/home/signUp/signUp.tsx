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

interface NumberType {
  userId: string | undefined,
  userPw: string | undefined,
  userPwCheck: string | undefined,
}


const SignUp = (prop:any) => {

  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CFaEnvelope = chakra(FaEnvelope);
  const canvas = useRef<any>(null);


  const [capchaNumber, setCapchaNumber] = useState<undefined | number>(undefined);
  const [signUpValue, setSignUpValue] = useState<NumberType>({
    userId: '',
    userPw: '',
    userPwCheck: ''
  });
  const [signUpOk, setSignUpOk] = useState(true); 

  useEffect(() => {

    let randomNumber = Math.floor(Math.random() * (9999 - 1000) + 1000);
    setCapchaNumber(randomNumber);

    if (canvas.current !== null) {
      const capChaCtx = canvas.current?.getContext('2d');
      capChaCtx.font = "80px arial";
      capChaCtx.color = "red";
      capChaCtx.strokeText(randomNumber, 105, 80);
    }
  }, []);
  const valueOnChange = (e:any) => {
    const { value, name } = e.target; 
    setSignUpValue({ ...signUpValue, [name]: value });
  }

  const capchaCheck = (e:any) => {
    if(parseInt(e.target.value) === capchaNumber) {
      setSignUpOk(false);
    }
  }

  const submitSignUp = async(e:any) => {
    e.preventDefault();
    prop.signUp(true);

    try {
    const response = await axios.post('https://dev-admin.luxon.run/auth/signup', {email:signUpValue.userId , password: signUpValue.userPw});
    console.log(response);
    }catch(err) {
      console.log(err);
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
                    children={<CFaEnvelope color="gray.300" />}
                  />
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
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
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
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
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
              <Box display={'flex'} flexDirection={'column'}>
                <canvas ref={canvas} width="400" height="100"></canvas>
                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    name="capcha"
                    type="number"
                    placeholder="인증번호 확인"
                    onChange={capchaCheck}
                    disabled={!signUpOk}
                  />
                </InputGroup>
              </FormControl>
              </Box>
              <Button
                disabled={signUpOk}
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

export default SignUp;

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


const SignUp = () => {

  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CFaEnvelope = chakra(FaEnvelope);
  const canvas = useRef<any>(null);

  useEffect(() => {
    console.log(canvas.current);
    let randomNumber = Math.floor(Math.random() * (9999 - 1000) + 1000);
    if (canvas.current !== null) {
      const capChaCtx = canvas.current?.getContext('2d');
      capChaCtx.font = "80px arial";
      capChaCtx.color = "red";
      capChaCtx.strokeText(randomNumber, 105, 80);
    }
  });

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
                    color="gray.300"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="이름"
                  />
                </InputGroup>
              </FormControl>
              {/* 이름 */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color="gray.300" />}
                  />
                  <Input type="email" placeholder="이메일" />
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
                    type="password"
                    placeholder="비밀번호"
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
                    type="password"
                    placeholder="비밀번호 확인"
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
                    type="number"
                    placeholder="인증번호 확인"
                  />
                </InputGroup>
              </FormControl>
              </Box>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
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

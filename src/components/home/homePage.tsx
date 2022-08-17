import { Box, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./login/login";
import SignUp from "./signUp/signUp";

const HomePage = () => {

  const [clickStatus, setClickStatus] = useState(true);

  const onClick = (e: any) => {
    if (e.target.innerHTML === '로그인') {
      setClickStatus(true);
    } else {
      setClickStatus(false);
    }
  }

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box width={'container.sm'} display={'flex'} flexDirection={'column'}>
        <Box display={'flex'} justifyContent={'center'}>
          {
            clickStatus ? <Login /> : <SignUp signUp={setClickStatus} />
          }
        </Box>
        <Box> {
          clickStatus ?
            <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
              <Text lineHeight={10} mr={5}>
                회원이 아닐 경우{" "}
              </Text>
              <Button onClick={onClick}>
                회원가입
              </Button>
            </Box>
            :
            <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
              <Text lineHeight={10} mr={5}>
                로그인 화면으로{" "}
              </Text>
              <Button onClick={onClick}>
                로그인
              </Button>
            </Box>
        }
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage;
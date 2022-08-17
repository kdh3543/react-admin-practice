import { Box, Text, Button, ButtonGroup } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <ButtonGroup variant='outline' spacing='6'>
        <Button colorScheme='blue'>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    </Box>
  )
}

export default HomePage;
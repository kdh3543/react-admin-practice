import { Box, Button } from "@chakra-ui/react"

export default function InfoHead(props:any) {
  return (
    <>
      <Box mb={'10px'} textAlign={'right'}>
        <Button
          colorScheme='purple'
          borderRadius={'15px'}
          onClick={() => props.onAirDrop()}
          disabled={props.success===true?true:false}
        >
          Run
        </Button> 
        <Button
          colorScheme='purple'
          borderRadius={'15px'}
          ml={'10px'}
          onClick={() => props.downloadFile()}
        >
          Export
        </Button>
        <Button
          colorScheme='purple'
          borderRadius={'15px'}
          ml={'10px'}
          onClick={() => props.toAirDrop()}
        >
          Back
        </Button>
      </Box>
      <Box display={'flex'} textAlign={'center'} mb={'10px'}>
        <Box w={'10%'}>Id</Box>
        <Box w={'10%'}>Main Net</Box>
        <Box w={'30%'}>Public Key</Box>
        <Box w={'10%'}>State</Box>
        <Box w={'10%'}>Token Id</Box>
        <Box w={'10%'}>Amount</Box>
        <Box w={'20%'}>TX Hash</Box>
      </Box>
    </>
  )
}
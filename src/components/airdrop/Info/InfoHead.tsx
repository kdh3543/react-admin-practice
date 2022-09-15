import { Box, Button } from "@chakra-ui/react"

export default function InfoHead(props:any) {
  return (
    <>
      <Box mb={'10px'} textAlign={'right'}>
        <Button
          colorScheme='purple'
          onClick={() => props.openPKeyModal()}
          disabled={props.success ? true : false}
          size="sm"
        >
          Run
        </Button> 
        <Button
          colorScheme='purple'
          ml={'10px'}
          onClick={() => props.downloadFile()}
          disabled={!props.success ? true : false}
          size="sm"
        >
          Export
        </Button>
        <Button
          colorScheme='purple'
          ml={'10px'}
          onClick={() => props.toAirDrop()}
          size="sm"
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
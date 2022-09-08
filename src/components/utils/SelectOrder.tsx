import { Box, Select } from "@chakra-ui/react"
export default function SelectOrder(props:any) {
  return (
    <Box position={'absolute'} bottom={'0px'} right={'0px'} w={'100px'} textAlign={'right'}>
      <Select placeholder="choice" onChange={(e) => {props.onSelect(e)}}>
        {/* <option value='choice' disabled>choice</option> */}
        <option value='ASC'>ASC</option>
        <option value='DESC'>DESC</option>
      </Select>
    </Box>
  )
}
import { Box,Button } from '@chakra-ui/react'
import DeleteAirDropModal from '../modal/deleteModal'
import { useDispatch } from 'react-redux'
import slice from '../hooks/store/slice/nftSlice'
import { useState } from 'react'

const nftSlice = slice()
export default function EventBody(props: any) {
  // console.log(getCookie('myToken'))
  const dispatch = useDispatch()
  
  const [delId, setDelId] = useState('')

  // delete modal
  const openDelete = (e: any, id: any) => {
    e.stopPropagation();
    dispatch(nftSlice.deleteSlice.actions.open(true))
    setDelId(id)
  }
  const closeModal = () => {
    dispatch(nftSlice.deleteSlice.actions.open(false))
  }

  
  
  return (
    <Box mt={3}>
      {props.eventList.map((data:any, index:Number) => (
        <Box
          key={data.id}
          display={'flex'}
          alignItems={'center'}
          borderRadius={'15px'}
          p={2}
          mt={2}
          border={'1px solid black'}
          textAlign={'center'}
          cursor={'pointer'}
          fontSize={'13px'}
          onClick={() => props.toEventInfo(data.id)}
        >
          <Box w={'10%'}>{data.id}</Box>
          <Box w={'15%'}>{data.type}</Box>
          <Box w={'15%'}>{data.subType}</Box>
          <Box w={'10%'}>{data.active ? 'true' : 'false'}</Box>
          <Box w={'20%'}>{data.startAt}</Box>
          <Box w={'20%'}>{data.endAt}</Box>
          <Box w={'10%'}>
            <Button
              cursor={'default'}
              colorScheme='red'
              size='sm'
              onClick={(e)=>openDelete(e,data.id)}
            >
              Delete
            </Button>
            <DeleteAirDropModal
              delId={delId}
              closeModal={closeModal}
              onDelete={(id:any) => props.onDelete(id)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
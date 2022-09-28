import axios from "axios"
import { getCookie } from "../utils/cookie"
import axiosApiMethod from "./axiosApiMethod"

const {authInstance,authFileInstance} = axiosApiMethod()

export default function eventApis() {
  const getEventList =  (page:Number, order:String) => {
    try {
      return authInstance.get(`/event?order=${order}&page=${page}&take=10`)
     
    } catch (err: any) {
      return err
    }
  }
  
  const deleteEvent =  (id: any) => {
    try {
      return authInstance.delete(`/event/${id}`)
    
    } catch (err: any) {
      return err
    }
  }

  const registerEvent =  (data: any) => {
    try {
      const eventData = {
        type: data.type,
        subType: data.subType,
        tokenId: data.tokenId,
        amount: data.amount,
        maxApplyCount: data.maxApplyCount,
        startAt: data.startAt,
        endAt: data.endAt,
        contractId: data.contractId,
        preconditionEventId: data.preconditionEventId,
      }
      return authInstance.post(`/event`,eventData)
   
    } catch (err: any) {
      return err
    }
  }

  const getEventInfo = (id: any) => {
    try {
      return authInstance.get(`/event/${id}`)
     
    } catch (err: any) {
      return err
    }
  }

  const updateEvent = (data:any) => {
    try {
      const updateData = {
        type: data.type,
        subType: data.subType,
        tokenId: parseInt(data.tokenId),
        amount:parseInt(data.amount),
        maxApplyCount:parseInt(data.maxApplyCount),
        active:data.active,
        applyCount:parseInt(data.applyCount),
        preconditionEventId:parseInt(data.preconditionEventId),
        startAt:data.startAt,
        endAt:data.endAt
      }
      return authInstance.put(`/event/${data.id}`,updateData)
    
    } catch (err: any) {
      return err
    }
  }

  const getUserList = (data: any) => {
    try {
      return authInstance.get(`/user-event/event-id?id=${data.id}&order=${data.order}&page=${data.page}&take=10`)
   
    } catch (err: any) {
      return err
    }
  }

  const importFile = (data: any) => {
    console.log(data.id[0])
    const frm = new FormData()
    frm.append('eventId', data.id[0])
    frm.append('file',data.file)
    try {
      return authFileInstance.post('/user-event/import',frm)
  
    } catch (err: any) {
      return err
    }
  }

  const airdropUserContractImport = () => {
    try {
      const data = {
        title: 'test',
        airdropContractName: 'AirdropGachaTicket',
        tokenName: 'GachaTicket'
      }
      return authInstance.post('/contract/dsp/data/airdrop/user/import/test',data)  
    } catch (err: any) {
      return err
    }
  }

  const getEventUsers = () => {
    try {
      return authInstance.get('/event/analysis/apply')
    } catch (err: any) {
      return err
    }
  }
  
  return {
    getEventList,
    deleteEvent,
    registerEvent,
    getEventInfo,
    updateEvent,
    getUserList,
    importFile,
    airdropUserContractImport,
    getEventUsers
  }
}
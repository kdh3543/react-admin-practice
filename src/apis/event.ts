import axios from "axios"
import { getCookie } from "../utils/cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function eventApis() {
  const getEventList =  (page:Number, order:String) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/event?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  
  const deleteEvent =  (id: any) => {
    try {
      return axios({
        method: 'delete',
        url: `${apiUrl}/event/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const registerEvent =  (data: any) => {
    try {
      return axios({
        method: 'post',
        url: `${apiUrl}/event`,
        data: {
          type: data.type,
          subType: data.subType,
          tokenId: data.tokenId,
          amount: data.amount,
          maxApplyCount: data.maxApplyCount,
          startAt: data.startAt,
          endAt: data.endAt,
          contractId: data.contractId,
          preconditionEventId: data.preconditionEventId,
        },
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const getEventInfo = (id: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/event/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const updateEvent = (data:any) => {
    try {
      return axios({
        method: 'put',
        url: `${apiUrl}/event/${data.id}`,
        data: {
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
        },
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const getUserList = (data: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/user-event/event-id?id=${data.id}&order=${data.order}&page=${data.page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
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
    getUserList
  }
}
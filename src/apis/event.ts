import axios from "axios"
import { getCookie } from "../utils/cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function eventApis() {
  const getEventList = async (page:Number, order:String) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/event?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  
  const deleteEvent = async (id: any) => {
    try {
      return await axios({
        method: 'delete',
        url: `${apiUrl}/event/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const registerEvent = async (data: any) => {
    try {
      return await axios({
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
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  
  return {
    getEventList,
    deleteEvent,
    registerEvent
  }
}
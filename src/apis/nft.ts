import axios from "axios";
import { getCookie } from "../utils/cookie";

// const apiUrlAdmin = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function nft() {
  const getDropList = async (order: String, page: Number) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/airdrop-centralization-task?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const deleteAirDrop = async (id: number) => {
    console.log(id)
    try {
      return await axios({
        method: 'delete',
        url: `${apiUrl}/airdrop-centralization-task/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
      
    } catch (err: any) {
      return err
    } 
  }
  const getAirdropInfo = async (data: any) => {
    console.log(getCookie('myToken'))
    console.log(data)
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/airdrop-user?taskId=${data.id}&order=${data.order}&page=${data.page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const getContractLists = async () => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/contract/simple`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const register = async (data:any) => {
    const frm = new FormData()
    frm.append('title', data.title)
    frm.append('contractId', data.contract)
    frm.append('file',data.file)
    try {
      return await axios({
        method: 'post',
        url: `${apiUrl}/airdrop-centralization-task/register`,
        data: frm,
        headers: {
          'content-Type': `multipart/form-data`,
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  return {
    getDropList,
    deleteAirDrop,
    getAirdropInfo,
    getContractLists,
    register
  }
}
import axios from "axios";
import { getCookie } from "../utils/cookie";

// const apiUrlAdmin = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function nft() {
  const getDropList = (order: String, page: Number) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/airdrop-centralization-task?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const deleteAirDrop = (id: number) => {
    console.log(id)
    try {
      return axios({
        method: 'delete',
        url: `${apiUrl}/airdrop-centralization-task/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
      
    } catch (err: any) {
      return err
    } 
  }
  const getAirdropInfo = (data: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/airdrop-user?taskId=${data.id}&order=${data.order}&page=${data.page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const getContractLists = () => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/contract/simple`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const register = (data:any) => {
    const frm = new FormData()
    frm.append('title', data.title)
    frm.append('contractId', data.contract)
    frm.append('file',data.file)
    try {
      return axios({
        method: 'post',
        url: `${apiUrl}/airdrop-centralization-task/register`,
        data: frm,
        headers: {
          'content-Type': `multipart/form-data`,
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const exportFile = (id: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/airdrop-centralization-task/export/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const airDropTokenIdExist = (id: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/airdrop-centralization-task/${id}/duplicated`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const run = (data: any) => {
    try {
      return axios({
        method: 'post',
        url: `${apiUrl}/airdrop-centralization-task/run`,
        data: {
          id: +data.id[0],
          privateKey: data.privateKey
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

  return {
    getDropList,
    deleteAirDrop,
    getAirdropInfo,
    getContractLists,
    register,
    exportFile,
    airDropTokenIdExist,
    run
  }
}
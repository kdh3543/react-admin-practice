import axios from "axios"
import { getCookie } from "../utils/cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function member() {
  const login = async (loginId:any,loginPw:any) => {
    try {
      return await axios.post(`${apiUrl}/auth/login`,{ email: loginId, password: loginPw })  
    } catch (err:any) {
      return err
    }
  }
  
  const getUsers = async (order: String, page: Number) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/user?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }

  const getUserInfo = async (userId:any) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/user/${userId}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }

  const getAdmins = async (order: String, page: Number) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/admin/user?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }
  const getAdminInfo = async (adminId: any) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/admin/user/${adminId}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err:any) {
      return err
    }
    
  }
  const modifyAdminInfo = async (userId: any, roles: any) => {
    try {
      return await axios({
        method: 'put',
        url: `${apiUrl}/admin/user/role`,
        data: {
          adminUserId: userId,
          roles: roles
        },
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }
  
  const toActivate = async (data:any) => {
    try {
      return await axios({
        method: 'put',
        url: `${apiUrl}/admin/user/activate`,
        data: {
          adminUserId: data.adminUserId,
          activate: data.activate,
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

  const searchByAddress = async (data: any) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/user/address/${data}`,
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
    login,
    getUsers,
    getAdmins,
    getUserInfo,
    getAdminInfo,
    modifyAdminInfo,
    toActivate,
    searchByAddress
  }
}
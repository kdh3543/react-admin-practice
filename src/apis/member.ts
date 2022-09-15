import axios from "axios"
import { getCookie } from "../utils/cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function member() {
  
  const login = (loginId:any,loginPw:any) => {
    try {
      return axios.post(`${apiUrl}/auth/login`,{ email: loginId, password: loginPw })  
    } catch (err:any) {
      return err
    }
  }
  
  const getUsers = (order: String, page: Number) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/user?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }

  const getUserInfo = (userId: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/user/${userId}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }

  const getAdmins = (order: String, page: Number) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/admin/user?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }
  const getAdminInfo = (adminId: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/admin/user/${adminId}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
    
  }
  const modifyAdminInfo = (userId: any, roles: any) => {
    try {
      return axios({
        method: 'put',
        url: `${apiUrl}/admin/user/role`,
        data: {
          adminUserId: userId,
          roles: roles
        },
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }
  
  const toActivate = (data:any) => {
    try {
      return axios({
        method: 'put',
        url: `${apiUrl}/admin/user/activate`,
        data: {
          adminUserId: data.adminUserId,
          activate: data.activate,
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

  const searchByAddress = (data: any) => {
    try {
      return axios({
        method: 'get',
        url: `${apiUrl}/user/address/${data}`,
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
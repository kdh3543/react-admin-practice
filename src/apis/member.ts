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
  
  const getUsers = async (page: any) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/user?order=ASC&page=${page}&take=10`,
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

  const getAdmins = async (page: any) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/admin/user?order=ASC&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }
  const getAdminInfo = async (adminId:any) => {
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
  
  return {login, getUsers, getAdmins, getUserInfo, getAdminInfo, modifyAdminInfo}
}
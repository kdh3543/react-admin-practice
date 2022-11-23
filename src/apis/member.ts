import axios from "axios"
import { Cookies } from "react-cookie"
import axiosApiMethod from "./axiosApiMethod"
import { AxiosInstance } from "axios"
import instance from "./axiosApiMethod"

const cookies = new Cookies()
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const {defaultInstance,authInstance} = axiosApiMethod()

export default function member() {
  const signup = async (email: any, password: any) => {
    try {
      const data = {
        email,
        password
      }
      return axios({
        method: 'post',
        url: `${apiUrl}/auth/signup`,
        data: data,
        headers: {
          'content-Type': 'application/json',
        }
      })
    } catch (err: any) {
      return err
    }
  }
  
  const login = async (loginId:any,loginPw:any) => {

    try {
      const data = {
        email: loginId,
        password: loginPw
      }
      console.log(data)
      return await axios({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        data,
        headers: {
          'content-Type': 'application/json',
        }
      })
    } catch (err:any) {
      return err
    }
  }
  
  const getUsers = async (order: String, page: Number) => {
    try {
      return await axios({
        method: 'GET',
        url: `${apiUrl}/user?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }

  const getUserInfo = async (userId: any) => {
    try {
      return await axios({
        method: 'GET',
        url: `${apiUrl}/user/${userId}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }

  const getAdmins = async (order: String, page: Number) => {
    try {
      return await axios({
        method: 'GET',
        url: `${apiUrl}/admin/user?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
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
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
    
  }
  const modifyAdminInfo = async (userId: any, roles: any) => {
    try {
      const data = {
        adminUserId: +userId,
        roles: roles
      }
      return await axios({
        method: 'put',
        url: `${apiUrl}/admin/user/role`,
        data,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err:any) {
      return err
    }
  }
  
  const toActivate = async (data:any) => {
    try {
      const activateData = {
        adminUserId: data.adminUserId,
        activate: data.activate,
      }
      return await axios({
        method: 'PUT',
        url: `${apiUrl}/admin/user/activate`,
        data:activateData,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const searchByAddress = async (data: any) => {
    try {
      return await axios({
        method: 'GET',
        url: `${apiUrl}/user/address/${data}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }

  const getCreateWalletUsers = async () => {
    try {
      return await axios({
        method: 'GET',
        url: `${apiUrl}/user/analysis/daily-created`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  return {
    signup,
    login,
    getUsers,
    getAdmins,
    getUserInfo,
    getAdminInfo,
    modifyAdminInfo,
    toActivate,
    searchByAddress,
    getCreateWalletUsers
  }
}
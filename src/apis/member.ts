import axios from "axios"
import { Cookies } from "react-cookie"
import axiosApiMethod from "./axiosApiMethod"
import { AxiosInstance } from "axios"
import instance from "./axiosApiMethod"

const cookies = new Cookies()
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// export class MemberApi {
//   axios: AxiosInstance = instance
//   constructor(axios?: AxiosInstance) {
//     if(axios) this.axios = axios
//   }

//   signup = async (email: string, password: string) => {
//     const signupData = {
//       email,
//       password
//     }
//     const { data } = await this.axios({
//       method: 'POST',
//       url: `/auth/signup/${signupData}`
//     })
//     return data
//   }
// }

// const memberApi = new MemberApi()
// export default memberApi


const {defaultInstance,authInstance} = axiosApiMethod()

export default function member() {
  const signup = (email: any, password: any) => {
    try {
      const data = {
        email,
        password
      }
      return defaultInstance.post('/auth/signup',data)
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
      return await defaultInstance.post('/auth/login',data)
    } catch (err:any) {
      return err
    }
  }
  
  const getUsers = (order: String, page: Number) => {
    try {
      return authInstance.get(`/user?order=${order}&page=${page}&take=10`)
    } catch (err:any) {
      return err
    }
  }

  const getUserInfo = (userId: any) => {
    try {
      return authInstance.get(`/user/${userId}`)
    } catch (err:any) {
      return err
    }
  }

  const getAdmins = async (order: String, page: Number) => {
    console.log('들어온 값은??')
    console.log(cookies.get('mytoken'))
    try {
      return await authInstance.get(`/admin/user?order=${order}&page=${page}&take=10`)
      // return axios({
      //   method: 'get',
      //   url: `${apiUrl}/admin/user?order=${order}&page=${page}&take=10`,
      //   headers: {
      //     'content-Type': 'application/json',
      //     Authorization: `Bearer ${cookies.get('mytoken')}`
      //   }
      // })
    } catch (err:any) {
      return err
    }
  }
  const getAdminInfo = (adminId: any) => {
    console.log('?들어온 건가?')
    try {
      return authInstance.get(`/admin/user/${adminId}`)
      // return axios({
      //   method: 'get',
      //   url: `${apiUrl}/admin/user/${adminId}`,
      //   headers: {
      //     'content-Type': 'application/json',
      //     Authorization: `Bearer ${cookies.get('mytoken')}`
      //   }
      // })
    } catch (err:any) {
      return err
    }
    
  }
  const modifyAdminInfo = (userId: any, roles: any) => {
    try {
      const data = {
        adminUserId: userId,
        roles: roles
      }
      return authInstance.put('/admin/user/role',data)
    } catch (err:any) {
      return err
    }
  }
  
  const toActivate = (data:any) => {
    try {
      const activateData = {
        adminUserId: data.adminUserId,
        activate: data.activate,
      }
      console.log('activateData?',activateData)
      return authInstance.put('/admin/user/activate',activateData)
    } catch (err: any) {
      return err
    }
  }

  const searchByAddress = (data: any) => {
    try {
      return authInstance.get(`/user/address/${data}`)
    } catch (err: any) {
      return err
    }
  }

  const getCreateWalletUsers = () => {
    try {
      return authInstance.get('/user/analysis/daily-created')
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
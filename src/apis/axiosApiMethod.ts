import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";

const cookies = new Cookies()
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// const instance = axios.create({
//   baseURL: apiUrl,
//   withCredentials: true,
// })

// const setAuthHeader = (token: string) => {
//   if (token) {
//     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
//   }
// }

// const unsetAuthHeader = () => {
//   delete instance.defaults.headers.common['Authorization']
// }

// instance.interceptors.request.use(
//  async (config) => {
//     const token = cookies.get('mytoken')
//     if(!token)
//     console.log('안나옴')
    
//     return config;
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

// instance.interceptors.response.use(
//   (res) => {
    
//   },
//   async (error) => {
//     console.log('error는??',error)
//   }
// )

export default function axiosApiMethod() {
  const axiosApi = (url: any) => {
    const apiInstance = axios.create({ baseURL: url })
    return apiInstance
  }
  
  const axiosAuthApi = (url: any) => {
    const token = cookies.get('mytoken')
    console.log('token값은?? ', token)
    const apiInstance = axios.create({
      baseURL: url,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    return apiInstance
  }
  const axiosAuthFileApi = (url: any) => {
    const token = cookies.get('mytoken')
    const apiInstance = axios.create({
      baseURL: url,
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    return apiInstance
  }
  const defaultInstance = axiosApi(apiUrl)
  const authInstance = axiosAuthApi(apiUrl)
  const authFileInstance = axiosAuthFileApi(apiUrl)
  return {defaultInstance, authInstance, authFileInstance}
}


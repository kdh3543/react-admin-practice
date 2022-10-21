import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { apiLogger } from "../utils/apiLogger";

const cookies = new Cookies()
const token = cookies.get('mytoken')
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function axiosApiMethod() {
  const axiosApi = (url: any) => {
    const apiInstance = axios.create({ baseURL: url })
    return apiInstance
  }
  
  const axiosAuthApi = (url: any) => {
    console.log('token값은?? ', token)
    if (!token) {
      console.log()
    }
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

  // axios.interceptors.request.use(
  //   (config) => {
  //     if(!token) console.log('cookie 없음3')
  //     console.log('config',config)
  //     return config
  //   },
  //   (error) => {
  //     if(!token) console.log('cookie 없음4')
  //     console.log('error뜸', error)
  //   }
  // )

  // axios.interceptors.response.use(
  //   async (config) => {
  //     if (!token) {
  //       console.log('cookie 없음1')
  //       console.log('token값',token)
  //     }
  //     console.log('response config',config)
  //     return config
  //   },
  //   (error) => {
  //     if(!token) console.log('cookie 없음2')
  //     console.log('response error뜸', error)
  //   }
  // )
  return {defaultInstance, authInstance, authFileInstance}
}

import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies()
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
export default function axiosApiMethod() {
  const axiosApi = (url: any, option: any) => {
    const instance = axios.create({ baseURL: url, ...option })
    return instance
  }
  
  const axiosAuthApi = (url: any, option: any) => {
    const token = cookies.get('mytoken')
    const instance = axios.create({
      baseURL: url,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      ...option
    })
    return instance
  }
  const axiosAuthFileApi = (url: any, option: any) => {
    const token = cookies.get('mytoken')
    const instance = axios.create({
      baseURL: url,
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      ...option
    })
    return instance
  }
  const defaultInstance = axiosApi(apiUrl)
  const authInstance = axiosAuthApi(apiUrl)
  const authFileInstance = axiosAuthFileApi(apiUrl)
  return {defaultInstance, authInstance, authFileInstance}
}


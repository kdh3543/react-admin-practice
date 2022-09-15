import axios from "axios"
import { getCookie } from "../utils/cookie"
export default function error() {
  const getError =  () => {
    try {
      return axios({
        method: 'get',
        url: `https://dev-admin.luxon.run/error/code`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('mytoken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  return {getError}
}
import axios from "axios"
import { getCookie } from "../utils/cookie"
export default function error() {
  const getError = async () => {
    try {
      return await axios({
        method: 'get',
        url: `https://dev-admin.luxon.run/error/code`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  return {getError}
}
import axios from "axios"
import axiosApiMethod from "./axiosApiMethod"

const {authInstance} = axiosApiMethod()
export default function error() {
  const getError =  () => {
    try {
      return authInstance.get('/error/code')
    } catch (err: any) {
      return err
    }
  }
  return {getError}
}
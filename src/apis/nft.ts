import axios from "axios";
import { getCookie } from "../utils/cookie";

// const apiUrlAdmin = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default function nft() {
  const getDropList = async (order: String, page: Number) => {
    try {
      return await axios({
        method: 'get',
        url: `${apiUrl}/airdrop-centralization-task?order=${order}&page=${page}&take=10`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('myToken')}`
        }
      })
    } catch (err: any) {
      return err
    }
  }
  const deleteAirDrop = async (id: number) => {
    console.log(id)
    try {
      return await axios({
        method: 'delete',
        url: `${apiUrl}/airdrop-centralization-task/${id}`
      })
      
    } catch (err: any) {
      return err
    } 
  }

  return { getDropList, deleteAirDrop }
}
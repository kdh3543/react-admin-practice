import axiosApiMethod from "./axiosApiMethod";

// const apiUrlAdmin = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`
// const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const {authInstance,authFileInstance} = axiosApiMethod()
export default function nft() {
  const getDropList = (order: String, page: Number) => {
    try {
      return authInstance.get(`/airdrop-centralization-task?order=${order}&page=${page}&take=10`)
    } catch (err: any) {
      return err
    }
  }
  const deleteAirDrop = (id: number) => {
    console.log(id)
    try {
      return authInstance.delete(`/airdrop-centralization-task/${id}`)
    } catch (err: any) {
      return err
    } 
  }
  const getAirdropInfo = (data: any) => {
    try {
      return authInstance.get(`/airdrop-user?taskId=${data.id}&order=${data.order}&page=${data.page}&take=10`)
    } catch (err: any) {
      return err
    }
  }
  const getContractLists = () => {
    try {
      return authInstance.get('contract/simple')
    } catch (err: any) {
      return err
    }
  }
  const register = (data:any) => {
    const frm = new FormData()
    frm.append('title', data.title)
    frm.append('contractId', data.contract)
    frm.append('file',data.file)
    try {
      return authFileInstance.post('/airdrop-centralization-task/register',frm)
    } catch (err: any) {
      return err
    }
  }

  const exportFile = (id: any) => {
    try {
      return authInstance(`/airdrop-centralization-task/export/${id}`)
    } catch (err: any) {
      return err
    }
  }

  const airDropTokenIdExist = (id: any) => {
    try {
      return authInstance.get(`/airdrop-centralization-task/${id}/duplicated`)
    } catch (err: any) {
      return err
    }
  }

  const run = (data: any) => {
    try {
      const runData = {
        id: +data.id[0],
        privateKey: data.privateKey
      }
      return authInstance.post('/airdrop-centralization-task/run',runData)
    } catch (err: any) {
      return err
    }
  }

  return {
    getDropList,
    deleteAirDrop,
    getAirdropInfo,
    getContractLists,
    register,
    exportFile,
    airDropTokenIdExist,
    run
  }
}
import { useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name,value,{...option})
}
export const getCookie = (name: string) => {
  // axios.defaults.headers.common['Authorization'] = `Bearer ${name}`
  return cookies.get(name)
}
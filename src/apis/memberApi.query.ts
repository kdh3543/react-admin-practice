import member from "./member";

export async function UseLogin(params: any) {
  const adminData = await member.login(params?.variables)
}
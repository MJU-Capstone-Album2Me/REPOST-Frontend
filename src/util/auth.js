import axios from "axios";

export const authenticate =  async (userId, password) => {
  const url = 'http://52.79.40.59:8080/api/auth'
  const response = await axios.post(url,{
    "authId": userId,
    "password": password
  })

  const token = response.data.accessToken

  return token
}

export const createUser = async (userId, password, nickname) => {
  const response = await axios.post(
    'http://52.79.40.59:8080/api/users/sign-up',
    {"authId": userId,
    "password": password,
    "nickname": nickname}
  )
  const token = response.data.idToken

  return token
}
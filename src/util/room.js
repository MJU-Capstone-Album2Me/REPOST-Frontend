import axios from "axios";
import { Alert } from "react-native";

export const getRoom =  async (token) => {
    const response = await axios.get(
        'http://52.79.40.59:8080/api/rooms',
        {
            headers: {Authorization: 'Bearer ' + token},
        }
      )
    return response.data.rooms
}

export const getRoomMember = async (token, roomId) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/members`

  const response = await axios.get(
    url,
    {headers: {Authorization: 'Bearer ' + token}}
  )
  return response.data.members
}

export const getRoomInviteCode =  async (token, roomId) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/inviteCode`

  const response = await axios.get(
      url,
      {
          headers: {Authorization: 'Bearer ' + token},
      }
    )
  return response.data.inviteCode
}

export const getRoomInviteList =  async (token, roomId) => {
  const url = `http://52.79.40.59:8080/api/room/${roomId}/invitation`
  console.log(url)
  const response = await axios.get(
      url,
      {
          headers: {Authorization: 'Bearer ' + token},
      }
    )
  return response.data.rooms
}

export const createRoom = async (name, token) => {
  try {
    const response = await axios.post(
      'http://52.79.40.59:8080/api/rooms',
      {"name": name},
      {
          headers: {Authorization: 'Bearer ' + token},
      }
    )
    console.log(response.data)
  } catch (error) {
    Alert('실패하였습니다. 다시 시도해주세요.')
  }
}

export const requestJoinRoom = async (inviteCode, token) => {
  const response = await axios.post(
    'http://52.79.40.59:8080/api/rooms/apply',
    {"inviteCode": inviteCode},
    {
        headers: {Authorization: 'Bearer ' + token},
    }
  )
}

export const responseJoinRoom = async (notificationId, applyId, token) => {
  console.log(notificationId, applyId, token)
  const response = await axios.post(
    `http://52.79.40.59:8080/api/rooms/request/${applyId}`,
    {"notificationId": notificationId},
    {
        headers: {Authorization: 'Bearer ' + token},
    }
  )
}

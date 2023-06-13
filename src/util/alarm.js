import axios from "axios";

export const getAlarm =  async (token) => {
  const url = 'http://52.79.40.59:8080/api/notifications'
  const response = await axios.get(
    url,
    {headers: {Authorization: 'Bearer ' + token}}
  )
  console.log(response.data.notifications)
  return response.data.notifications
}

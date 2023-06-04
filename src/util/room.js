import axios from "axios";

export const getRoom =  async (token) => {
    const response = await axios.get(
        'http://52.79.40.59:8080/api/room',
        {
            headers: {Authorization: 'Bearer ' + token},
        }
      )
    console.log(response.data)
}

export const createRoom = async (name, token) => {
  const response = await axios.post(
    'http://52.79.40.59:8080/api/rooms',
    {"name": name},
    {
        headers: {Authorization: 'Bearer ' + token},
    }
  )
  console.log(response.data)

}
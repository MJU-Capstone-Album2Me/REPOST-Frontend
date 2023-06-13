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
  console.log('?')
  const response = await axios.post(
    'http://52.79.40.59:8080/api/users/sign-up',
    {"authId": userId,
    "password": password,
    "nickname": nickname}
  )
  .catch((error) => {
    console.log(error)
    return {
      "status": 400,
      "message": "에러가 발생하였습니다. 다시 시도해주세요"
    }
  })
  return {
    "status": 200,
    "message": "회원가입이 완료되었습니다"
  }
}

export const patchProfile = async (token, profile) => {
  let formData = new FormData();
  const url = `http://52.79.40.59:8080/api/users/profile-image`

  var image = {
    uri: profile.uri,
    type: 'image/jpg',
    name: profile.fileName ? profile.fileName : profile.uri.split('/')[profile.uri.split('/').length - 1],
  };
  formData.append('profileImage', image)

  const response = axios.patch(
    url,
    formData,
    {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-type" : "multipart/form-data",
          // "Access-Control-Allow-Origin": "*",
        },
    }
  )
  console.log(response.data)
}

export const getProfile = async (token) => {
  const url = 'http://52.79.40.59:8080/api/users/profile-image'

  const response = await axios.get(
    url,
    {headers: {Authorization: 'Bearer ' + token}}
  ).catch((err) => console.log(err) )

  console.log(response.data.profileImage)
  return response.data.profileImage
}
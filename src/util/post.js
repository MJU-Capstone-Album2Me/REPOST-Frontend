import axios from "axios";
const FormData = global.FormData;

export const runningModel = async ({token, imgList}) => {
  let formData = new FormData();
  const url = `http://52.78.242.62:80/image-detection`
  imgList.forEach((img, idx) => {
    var image = {
      uri: img.uri,
      type: 'image/jpg',
      name: img.fileName ? img.fileName : img.uri.split('/')[img.uri.split('/').length - 1],
    };
    formData.append('images', image)
  });

  const response = await axios.post(
    url,
    formData,
    {
        headers: {
          "Content-type" : "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
    }
  )

  return response.data.imagesUrl
}

export const createPost = async ({roomId, title, content, imgList, token}) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/posts`
  
  axios.post(
    url,
    {
    "title" : title,
    "contents" : content,
    "imageUrls" : imgList
    },
    {
        headers: {
          Authorization: 'Bearer ' + token,
          // "Access-Control-Allow-Origin": "*",
        },
    }
  )
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
}

export const getPosts = async (token, roomId, cursor) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/posts?cursor=${cursor}`

  const response = await axios.get(
    url,
    {headers: {Authorization: 'Bearer ' + token}}
  ).catch((err) => console.log(err) )
  console.log(response.data)
  return response.data.items
}

export const getPostDetail = async (token, roomId, postId) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/posts/${postId}`

  const response = await axios.get(
    url,
    {headers: {Authorization: 'Bearer ' + token}}
  ).catch((err) => console.log(err) )
  console.log(response.data)
  return response.data
}

export const getGallery =  async (token, roomId, cursor) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/posts/images?cursor=${cursor}`

  const response = await axios.get(
    url,
    {headers: {Authorization: 'Bearer ' + token}}
  ).catch((err) => console.log(err) )
  
  console.log(response.data)
  return response.data.items
}

export const postComment = async (token, roomId, postId, comment) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/posts/${postId}/comments`
  const response = await axios.post(
    url,
    {
      "contents" : comment
    },
    {
        headers: {Authorization: 'Bearer ' + token},
    }
  )
  console.log(response.data)
}

export const postReply = async (token, roomId, postId, commentId, comment) => {
  const url = `http://52.79.40.59:8080/api/rooms/${roomId}/posts/${postId}/comments/${commentId}/replies`

  const response = await axios.post(
    url,
    {
      "contents" : comment
    },
    {
        headers: {Authorization: 'Bearer ' + token},
    }
  )
  console.log(response.data)
}

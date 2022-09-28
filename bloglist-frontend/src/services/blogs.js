import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const saveBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const blogsService = { getAll, saveBlog, setToken }

export default blogsService
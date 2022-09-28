import axios from 'axios'
const baseUrl = '/api/login'

const authenticate = async (credentials) => {
  const request = axios.post(baseUrl, credentials)
  return request.then(response => response.data)
}

export default { authenticate }
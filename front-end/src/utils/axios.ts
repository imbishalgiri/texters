import axios from 'axios'

const apiRequest = axios.create({
   baseURL: 'http://localhost:4000/api',
   timeout: 30000,
})

export default apiRequest

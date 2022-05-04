import axios from 'axios'

const apiRequest = axios.create({
   baseURL: 'http://localhost:4000/api',
   timeout: 600000,
})

apiRequest.interceptors.request.use(
   (config) => {
      if (config.headers) {
         config.headers['Content-Type'] = 'application/json'
         const token = localStorage.getItem('chatAppToken')
         if (token) config.headers['Authorization'] = token
      }
      return config
   },
   (error) => Promise.reject(error)
)

export default apiRequest

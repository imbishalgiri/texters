import apiRequest from 'utils/axios'

export type User = {
   name: string
   email: string
   password: string
   passwordConfirm?: string
}

const EndPoint = 'auth'

const signup = <T>(data: T): Promise<any> => {
   return apiRequest.post(`${EndPoint}/signup`, data)
}

export { signup }

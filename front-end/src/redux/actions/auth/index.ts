import apiRequest from 'utils/axios'
import { AxiosResponse } from 'axios'

export type User = {
   name: string
   email: string
   password: string
   passwordConfirm?: string
}

export interface UserLogin<T = any> {
   email: string
   password: string
   data?: T
}

const ENDPOINT = 'auth'

const signup = <User>(data: User): Promise<User> => {
   return apiRequest.post(`${ENDPOINT}/signup`, data)
}

const loginAction = (data: UserLogin): Promise<UserLogin> => {
   return apiRequest.post(`${ENDPOINT}/login`, data)
}

export { signup, loginAction }

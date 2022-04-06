import apiRequest from 'utils/axios'

export type User = {
   name: string
   email: string
   password: string
   passwordConfirm?: string
}

export type UserLogin = {
   email: string
   password: string
}

const EndPoint = 'auth'

const signup = <User>(data: User): Promise<User> => {
   return apiRequest.post(`${EndPoint}/signup`, data)
}

const loginAction = (data: UserLogin): Promise<UserLogin> => {
   return apiRequest.post(`${EndPoint}/login`, data)
}

export { signup, loginAction }

import ApiRequest from 'utils/axios'

const ENDPOINT = 'chat'
/**
 *
 *  There is no necessity to provide any user info because
 *  backend figures out the user through the json web token
 *  that is present in the header
 *
 **/

export type TypeSendMessage = {
   receiverId: string
   message: string
}

const getAllChats = async () => await ApiRequest.get(`${ENDPOINT}/`)

const getAllMessages = async (id: string) =>
   await ApiRequest.get(`message/${id}`)

const messageSender = async (message: TypeSendMessage) =>
   await ApiRequest.post(`${ENDPOINT}/`, message)

// exports right here
export { getAllChats, getAllMessages, messageSender }

import ApiRequest from 'utils/axios'

const ENDPOINT = 'chat'
/**
 *
 *  There is no necessity to provide any user info because
 *  backend figures out the user through the json web token
 *  that is present in the header
 *
 **/
const getAllChats = async () => await ApiRequest.get(`${ENDPOINT}/`)

// exports right here
export { getAllChats }

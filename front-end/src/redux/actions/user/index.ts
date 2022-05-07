import { AxiosResponse } from 'axios'
import ApiRequest from 'utils/axios'

const ENDPOINT = 'user'
// this is an endpoint to upload an image
const addImage = (data: FormData) =>
   ApiRequest.patch(`${ENDPOINT}/addImage`, data)

const getAllUsers = async (searchText: string) =>
   await ApiRequest.get(`${ENDPOINT}/all?name=${searchText}`)

// exports right here
export { addImage, getAllUsers }

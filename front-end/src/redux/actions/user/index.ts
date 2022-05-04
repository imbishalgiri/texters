import ApiRequest from 'utils/axios'

const ENDPOINT = 'user'
// this is an endpoint to upload an image
const addImage = (data: FormData) =>
   ApiRequest.patch(`${ENDPOINT}/addImage`, data)

// exports right here
export { addImage }

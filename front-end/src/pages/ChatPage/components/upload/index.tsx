import React, { useState, ChangeEvent, RefObject } from 'react'
import { Input, Button, Avatar } from '@chakra-ui/react'
import { imageUploadProps } from './types'

const UploadImage = ({ onFileChooseClick }: imageUploadProps) => {
   const hiddenFileInput: RefObject<HTMLInputElement> = React.useRef(null)
   const [fileName, setFileName] = useState('')
   const [imageUrl, setImageUrl] = useState('')

   const handleClick = () => {
      hiddenFileInput?.current?.click()
   }

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const fileUploaded = event?.currentTarget?.files
      if (fileUploaded) {
         onFileChooseClick(fileUploaded[0])
         setFileName(fileUploaded[0].name)
         setImageUrl(URL.createObjectURL(fileUploaded[0]))
      }
   }
   return (
      <>
         {!imageUrl && (
            <Button
               borderRadius="100px"
               onClick={handleClick}
               fontSize="14px"
               background="#1e53dab3"
               color="#fff"
               margin="0 5px 0 0"
               _hover={{ background: '#1e53daf0' }}
            >
               Choose Image
            </Button>
         )}
         {imageUrl && (
            <Avatar
               _hover={{ cursor: 'pointer' }}
               onClick={handleClick}
               size="md"
               src={imageUrl}
            />
         )}
         <Input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/jpg, image/heic, image/svg"
         />
         {fileName && <span>{fileName}</span>}
      </>
   )
}

export default UploadImage

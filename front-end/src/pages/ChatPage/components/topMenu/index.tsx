import React, { useState, useEffect } from 'react'
import {
   Flex,
   Box,
   Spacer,
   Menu,
   MenuButton,
   Avatar,
   MenuList,
   MenuItem,
   Button,
   useToast,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalCloseButton,
   ModalHeader,
   ModalBody,
   ModalFooter,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AxiosResponse, AxiosError } from 'axios'
import { useMutation } from 'react-query'
// --> local imports
import UploadImage from '../upload/index'
import { useAppSelector } from 'redux/hooks'
import { logout } from 'redux/slices/authSlices'
import { addImage } from 'redux/actions/user'

const TopMenu = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const Toast = useToast()
   const user = useAppSelector((state) => state.auth)
   const [avatar, setAvatar] = useState('')
   const [imgUploadModel, setImgUploadModel] = useState(false)
   const [uploadData, setUploadData] = useState<FormData>()

   const onFileChooseClick = (data: File) => {
      const formData = new FormData()
      formData.append('image', data)
      setUploadData(formData)
   }
   const { mutate, isError, error, isLoading, data } = useMutation<
      AxiosResponse, // expected response
      AxiosError, // this is expected error object
      FormData // this is expected upload data
   >((data) => {
      return addImage(data)
   })
   const onImageUpdate = () => {
      console.log(uploadData)
      uploadData && mutate(uploadData)
   }

   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   useEffect(() => {
      setAvatar(user?.user?.avatar)
      if (data) {
         setImgUploadModel(false)
         Toast({
            title: 'Image uploaded successfully',
            description: 'Other users can see your image right away',
            status: 'success',
            position: 'top-right',
            duration: 7000,
            isClosable: true,
         })
      }
      if (isError) {
         Toast({
            title: 'Error',
            description: 'Sorry :( server or network error',
            status: 'error',
            position: 'top-right',
            duration: 7000,
            isClosable: true,
         })
      }
   }, [user, data])

   return (
      <>
         <Flex
            zIndex={33}
            background={'#2118c8'}
            color={'#fff'}
            padding={'30px 40px'}
         >
            <Box fontWeight={'800'}>LOGO HERE</Box>
            <Spacer />

            <Menu>
               <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon color="#000" />}
               >
                  <Avatar size="sm" name={user.user.name} src={avatar} />
               </MenuButton>
               <MenuList color="#000">
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem onClick={() => setImgUploadModel(true)}>
                     Change picture
                  </MenuItem>
               </MenuList>
            </Menu>
         </Flex>
         {imgUploadModel && (
            <Modal
               isCentered
               isOpen={imgUploadModel}
               onClose={() => setImgUploadModel(false)}
               motionPreset="slideInBottom"
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Image Upload</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <UploadImage onFileChooseClick={onFileChooseClick} />
                  </ModalBody>

                  <ModalFooter>
                     <Button
                        colorScheme="cyan"
                        mr={3}
                        onClick={() => setImgUploadModel(false)}
                     >
                        Close
                     </Button>
                     {uploadData && (
                        <Button
                           isLoading={isLoading}
                           colorScheme="blue"
                           onClick={onImageUpdate}
                        >
                           Upload
                        </Button>
                     )}
                  </ModalFooter>
               </ModalContent>
            </Modal>
         )}
      </>
   )
}

export default TopMenu

import React, { useState } from 'react'

import { useNavigate } from 'react-router'
import {
   Box,
   Center,
   Input,
   InputGroup,
   InputRightElement,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Button,
   Spacer,
   Flex,
   Avatar,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
} from '@chakra-ui/react'
import UploadImage from './components/upload'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { useAppDispatch } from 'redux/hooks'
import { logout } from 'redux/slices/authSlices'
import { HomepageBox } from 'pages/HomePage/styles/homepage.styles'

function ChatPage() {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const [imgUploadModel, setImgUploadModel] = useState(false)
   const [uploadData, setUploadData] = useState<FormData>()

   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   const onFileChooseClick = (data: File) => {
      const formData = new FormData()
      formData.append('image', data)
      setUploadData(formData)
   }

   return (
      <>
         <HomepageBox paddingBottom="40px">
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
                     <Avatar size="sm" name="Bishal" src="user" />
                  </MenuButton>
                  <MenuList color="#000">
                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
                     <MenuItem onClick={() => setImgUploadModel(true)}>
                        Change picture
                     </MenuItem>
                  </MenuList>
               </Menu>
            </Flex>
            <br />
            <br />
            <Flex width={'100vw'}>
               <Box
                  borderRadius={'10px'}
                  background={'royalBlue'}
                  height={'80vh'}
                  width={'17vw'}
                  margin={'0 60px 0 30px'}
                  padding={'25px'}
               >
                  <InputGroup>
                     <Input
                        color={'#fff'}
                        placeholder="search user"
                        size={'md'}
                     />
                     <InputRightElement width={'70px'}>
                        <Button size="md">
                           <Box fontSize={'12px'}>search</Box>
                        </Button>
                     </InputRightElement>
                  </InputGroup>
                  <Box
                     background={'#fff'}
                     color="#000"
                     margin={'15px 0 15px 0'}
                     width={'100%'}
                     padding="7px"
                     borderRadius="5px"
                  >
                     <Center>i am search item</Center>
                  </Box>
               </Box>
               <Flex width={'70vw'} flexDirection={'column'}>
                  <Box
                     borderRadius={'10px'}
                     height={'7vh'}
                     background={'pink'}
                     mb={'30px'}
                  >
                     <Center>This is box 2</Center>
                  </Box>

                  <Box
                     background={'violet'}
                     height={'100%'}
                     borderRadius={'10px'}
                  >
                     <Center>This is box 3</Center>
                  </Box>
               </Flex>
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
                           <Button colorScheme="blue">Upload</Button>
                        )}
                     </ModalFooter>
                  </ModalContent>
               </Modal>
            )}
         </HomepageBox>
      </>
   )
}

export default ChatPage

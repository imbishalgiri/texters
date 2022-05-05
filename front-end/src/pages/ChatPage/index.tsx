import React from 'react'
import Sidebar from './components/sidebar'
import TopMenu from './components/topMenu'
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
   useToast,
} from '@chakra-ui/react'
import UploadImage from './components/upload'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AxiosError, AxiosResponse } from 'axios'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { logout } from 'redux/slices/authSlices'
import { HomepageBox } from 'pages/HomePage/styles/homepage.styles'

import { useMutation } from 'react-query'

function ChatPage() {
   return (
      <>
         <HomepageBox paddingBottom="40px">
            <TopMenu />
            <br />
            <br />
            <Flex width={'100vw'}>
               <Sidebar />
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
         </HomepageBox>
      </>
   )
}

export default ChatPage

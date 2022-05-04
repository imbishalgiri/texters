import React from 'react'

import { useNavigate } from 'react-router'
import {
   Box,
   Center,
   Input,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react'
import { Button, Spacer, Flex } from '@chakra-ui/react'
import { useAppDispatch } from 'redux/hooks'
import { logout } from 'redux/slices/authSlices'

function ChatPage() {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const handleLogout = () => {
      dispatch(logout())
      navigate('/')
   }

   return (
      <>
         <Flex background={'#2118c8'} color={'#fff'} padding={'30px 40px'}>
            <Box fontWeight={'800'}>LOGO HERE</Box>
            <Spacer />
            <Button color={'#000'} onClick={handleLogout}>
               Logout
            </Button>
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
                  <Input color={'#fff'} placeholder="search user" size={'md'} />
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

               <Box background={'violet'} height={'100%'} borderRadius={'10px'}>
                  <Center>This is box 3</Center>
               </Box>
            </Flex>
         </Flex>
      </>
   )
}

export default ChatPage

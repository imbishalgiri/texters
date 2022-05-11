import React from 'react'
import {
   Avatar,
   Box,
   Center,
   Flex,
   Spacer,
   HStack,
   Input,
} from '@chakra-ui/react'
import { HomepageBox } from 'pages/HomePage/styles/homepage.styles'
import Sidebar from './components/sidebar'
import TopMenu from './components/topMenu'
import { ReceiverItem, SenderItem } from './utils/ChatItem'
import EmptyMessage, { MessageSpinner } from './utils/EmptyMessage'
import { ChatIcon } from '@chakra-ui/icons'

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
                     background="#ffffff"
                     height={'65vh'}
                     borderRadius={'10px 10px 0 0'}
                     position="relative"
                  >
                     {/* <Flex
                        overflow="scroll"
                        width="100%"
                        height="100%"
                        direction="column"
                        paddingRight="2rem"
                        paddingTop="1.5rem"
                        paddingBottom="6rem"
                     >
                        <ReceiverItem
                           // avatar="idk"
                           name="samantha doe"
                           text="I am Receiver first got it???"
                        />
                        <ReceiverItem
                           avatar="idk"
                           name="samantha doe"
                           text="I am Receiver got it???"
                        />

                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <ReceiverItem
                           // avatar="idk"
                           name="samantha doe"
                           text="I am REceiver myan"
                        />
                        <ReceiverItem
                           // avatar="idk"
                           name="samantha doe"
                           text="I am REceidsfdsfsdf ver myan"
                        />
                        <ReceiverItem
                           avatar="idk"
                           name="samantha doe"
                           text="I am REc  eiver myan"
                        />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                     </Flex> */}

                     <EmptyMessage />

                     {/* <MessageSpinner /> */}
                     <Box
                        position="absolute"
                        padding="1rem"
                        width="100%"
                        bottom="0"
                        background="#ede7e7"
                     >
                        <Center>
                           <Input
                              type="text"
                              placeholder="write a message here"
                              border="#fff"
                              background="#b4b4c6"
                              zIndex="20"
                              color="#3e3939"
                              _placeholder={{ color: '#464040' }}
                              width="60%"
                              margin="0 10px"
                           />

                           <ChatIcon
                              cursor="pointer"
                              margin="0 10px"
                              color="#241cb5"
                              fontSize="1.6rem"
                           />
                        </Center>
                     </Box>
                  </Box>
               </Flex>
            </Flex>
         </HomepageBox>
      </>
   )
}

export default ChatPage

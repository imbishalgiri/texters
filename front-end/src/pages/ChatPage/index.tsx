import React from 'react'
import { Avatar, Box, Center, Flex, Spacer, HStack } from '@chakra-ui/react'
import { HomepageBox } from 'pages/HomePage/styles/homepage.styles'
import Sidebar from './components/sidebar'
import TopMenu from './components/topMenu'
import { ReceiverItem, SenderItem } from './utils/ChatItem'

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
                     >
                        <ReceiverItem
                           avatar="idk"
                           name="samantha doe"
                           text="I am Receiver got it???"
                        />

                        <SenderItem text="I am damn sender Xd" />
                        <SenderItem text="I am damn sender Xd" />
                        <ReceiverItem
                           avatar="idk"
                           name="samantha doe"
                           text="I am REceiver myan"
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

                     <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        height="100%"
                     >
                        <div>
                           <strong>
                              You Guys do not have any messages yet !!!
                           </strong>
                           <br />
                        </div>

                        <Box>Please write your first message</Box>
                     </Flex>
                     <Box
                        position="absolute"
                        padding="1rem"
                        width="100%"
                        bottom="0"
                        background="#ede7e7"
                     >
                        <Center>
                           I will be Replaced by message Typing item
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

import React from 'react'
import { Box, Center, Flex } from '@chakra-ui/react'
import { HomepageBox } from 'pages/HomePage/styles/homepage.styles'
import Sidebar from './components/sidebar'
import TopMenu from './components/topMenu'

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

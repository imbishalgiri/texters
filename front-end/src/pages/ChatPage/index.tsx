import React, { useMemo, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Avatar, Box, Center, Flex, Input, Spinner } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { AxiosResponse, AxiosError } from 'axios'
import { HomepageBox } from 'pages/HomePage/styles/homepage.styles'
import Sidebar from './components/sidebar'
import TopMenu from './components/topMenu'
import EmptyMessage from './utils/EmptyMessage'
import MessageBox from './components/messageBox'
import io, { Socket } from 'socket.io-client'
import { TypeSendMessage, messageSender } from 'redux/actions/chat'
import { addMessage } from 'redux/slices/messageSlices'

const ENDPOINT = 'http://localhost:4000'
let socket: Socket

function ChatPage() {
   const [appChatId, setAppChatId] = useState<string>('')
   const [receiverId, setReceiverId] = useState<string>('')
   const [messageText, setMessageText] = useState<string>('')

   const chatId = useAppSelector((state) => state.chat?.chatId)
   const { user } = useAppSelector((state) => state.auth)
   const messageFromStore = useAppSelector((state) => state.message.message)
   const [searchParams] = useSearchParams()
   const dispatch = useAppDispatch()

   useEffect(() => {
      const id = searchParams.get('id')
      const receiver = searchParams.get('u')
      if (id) setAppChatId(id)
      if (receiver) setReceiverId(receiver)
      if (chatId) {
         setMessageText('')
         setAppChatId(chatId)
      }
   }, [chatId, searchParams])

   const {
      mutate: sendMessage,
      isLoading,
      data,
      error,
      isError,
   } = useMutation<AxiosResponse, AxiosError, TypeSendMessage>(
      (messageObject) => messageSender(messageObject)
   )

   const handleSend = () => {
      messageText && sendMessage({ receiverId, message: messageText })
   }
   // useEffect for message sending to implement socket io
   useEffect(() => {
      socket = io(ENDPOINT)
      socket.on('receiveMessage', (message) => {
         dispatch(addMessage({ message }))
      })
   })
   useEffect(() => {
      socket.emit('joinChat', chatId)
   }, [chatId])
   useEffect(() => {
      if (data) {
         console.log('d', data, chatId)
         socket.emit(
            'newMessage',
            [
               ...messageFromStore,
               {
                  chat: data.data.data.chat,
                  message: messageText,
                  sender: {
                     avatar: user.avatar,
                     name: user.name,
                     _id: user.id,
                  },
               },
            ],
            chatId
         )
      }
   }, [data, chatId])
   console.log(messageFromStore)
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
                     <Center>This is box 2 + {receiverId}</Center>
                  </Box>

                  <Box
                     background="#ffffff"
                     height={'65vh'}
                     borderRadius={'10px 10px 0 0'}
                     position="relative"
                     key={appChatId}
                  >
                     {!appChatId && <EmptyMessage />}

                     {appChatId && <MessageBox chatId={appChatId} />}
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
                              value={messageText}
                              onChange={(
                                 event: React.ChangeEvent<HTMLInputElement>
                              ) => setMessageText(event.target.value)}
                           />

                           {messageText && (
                              <ChatIcon
                                 cursor="pointer"
                                 margin="0 10px"
                                 color="#241cb5"
                                 fontSize="1.6rem"
                                 onClick={handleSend}
                              />
                           )}

                           {!messageText && isLoading && <Spinner />}
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

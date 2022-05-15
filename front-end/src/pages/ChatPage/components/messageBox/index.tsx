import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { Flex, Spacer } from '@chakra-ui/react'
import { ReceiverItem, SenderItem } from 'pages/ChatPage/utils/ChatItem'
import { getAllMessages } from 'redux/actions/chat'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { MessageSpinner } from 'pages/ChatPage/utils/EmptyMessage'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { addMessage, TypeMessage } from 'redux/slices/messageSlices'

import io, { Socket } from 'socket.io-client'
const ENDPOINT = 'http://localhost:4000'
let socket: Socket, selectedChatCompare

type propTypesMessageBox = {
   chatId: string
   setReceiverId: (id: string) => void
}

// actual component <--
const MessageBox = ({ chatId, setReceiverId }: propTypesMessageBox) => {
   const [receiverUserId, setReceiverUserId] = useState<string>('')
   // this shit to be kept in redux store
   const [messageData, setMessageData] = useState<
      {
         _id: string
         chat: string
         message: string
         sender: any
      }[]
   >()
   const dispatch = useAppDispatch()

   const { name } = useAppSelector((state) => state.auth.user)
   const message = useAppSelector((state) => state.message)

   const { isLoading, isFetching, error, data, refetch } = useQuery<
      AxiosResponse,
      AxiosError
   >('messages', () => getAllMessages(chatId), { refetchOnWindowFocus: false })

   // this user is mutuated and since it is mutuated a lots of time,it has to be memoized so i memoized this user object to memoized user
   let user: any = {}
   const memoizedUser = useCallback(() => user, [user])

   useEffect(() => {
      if (data) {
         dispatch(addMessage({ message: data?.data?.data }))
      }
   }, [data])
   // useEffect for message sending to implement socket io
   useEffect(() => {
      socket = io(ENDPOINT)
      socket.on('connected', () => {
         console.log('connected')
      })
   }, [chatId])

   useEffect(() => {
      refetch()
      socket.emit('joinChat', chatId)
   }, [chatId])

   // this one is for local state update
   useEffect(() => {
      const user = memoizedUser()
      if (Object.keys(user).length) {
         setReceiverUserId(user._id)
      }
   }, [memoizedUser])
   console.log('message', message)
   // this one is for parent state update
   useEffect(() => {
      setReceiverId(receiverUserId)
   }, [receiverUserId])
   /*
   this function does 2 things
   1. format the response message data
   2. mutates the global user object
   */
   const formatMessage = (message: TypeMessage): ReactJSXElement[] => {
      let formattedMessage: ReactJSXElement[] = []
      if (message) {
         formattedMessage = message.message?.map(
            (message: any, index: number) => {
               if (message.sender.name === name) {
                  return <SenderItem key={index} text={message.message} />
               }
               user = message.sender
               return (
                  <ReceiverItem
                     key={index}
                     avatar={message.sender.avatar}
                     name={message.sender.name}
                     text={message.message}
                  />
               )
            }
         )
      }
      return formattedMessage
   } //--EOF

   return (
      <Flex
         overflow="scroll"
         width="100%"
         height="100%"
         direction="column"
         paddingRight="2rem"
         paddingTop="1.5rem"
         paddingBottom="6rem"
      >
         <Spacer />
         {(isLoading || isFetching) && <MessageSpinner />}
         {!isLoading && !isFetching && formatMessage(message)}
      </Flex>
   )
}

export default MessageBox

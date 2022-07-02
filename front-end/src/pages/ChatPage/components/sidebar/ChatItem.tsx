import React, { memo } from 'react'
import { useAppDispatch } from 'redux/hooks'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'
import { AxiosError, AxiosResponse } from 'axios'
import { Stack, Skeleton } from '@chakra-ui/react'

import { getAllChats } from 'redux/actions/chat'
import CardItem from 'pages/ChatPage/utils/CardItem'
import { useAppSelector } from 'redux/hooks'
import { addChat } from 'redux/slices/chatSlices'

const ChatItem = () => {
   const { user } = useAppSelector((state) => state.auth)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { data } = useQuery<AxiosResponse, AxiosError>('users', () =>
      getAllChats()
   )

   const handleClick = (id: string, receiver: string): void => {
      navigate('?id=' + id + '&u=' + receiver)
      dispatch(addChat({ chatId: id, receiver }))
   }

   const getAllCards = () => {
      if (data) {
         return data.data.data.map((el: any, index: number) => {
            const userData = el?.users?.find(
               (innerUser: any) => innerUser._id !== user.id
            )
            return (
               <CardItem
                  key={index}
                  index={index}
                  data={userData}
                  latestMessage={el.recentMessage}
                  clickFunction={() => handleClick(el._id, userData._id)}
               />
            )
         })
      }
   }

   return (
      <>
         {data && getAllCards()}
         {!data && (
            <Stack marginTop="20px">
               <Skeleton height="50px" />
               <Skeleton height="50px" />
               <Skeleton height="50px" />
            </Stack>
         )}
      </>
   )
}

export default memo(ChatItem)

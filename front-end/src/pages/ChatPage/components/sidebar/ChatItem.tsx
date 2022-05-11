import React, { memo, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getAllChats } from 'redux/actions/chat'
import { AxiosError, AxiosResponse } from 'axios'
import CardItem from 'pages/ChatPage/utils/CardItem'
import { useAppSelector } from 'redux/hooks'
import { Stack, Skeleton } from '@chakra-ui/react'

const ChatItem = () => {
   const { user } = useAppSelector((state) => state.auth)
   const { isLoading, isFetching, error, data, refetch } = useQuery<
      AxiosResponse,
      AxiosError
   >('users', () => getAllChats())

   const getAllCards = () => {
      if (data) {
         return data.data.data.map((el: any, index: number) => {
            const userData = el.users.find(
               (innerUser: any) => innerUser._id !== user.id
            )
            return (
               <CardItem
                  key={index}
                  index={index}
                  data={userData}
                  latestMessage={el.recentMessage}
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

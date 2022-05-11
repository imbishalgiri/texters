import React, { memo, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getAllChats } from 'redux/actions/chat'
import { AxiosError, AxiosResponse } from 'axios'

const ChatItem = () => {
   const { isLoading, isFetching, error, data, refetch } = useQuery<
      AxiosResponse,
      AxiosError
   >('users', () => getAllChats())

   return <></>
}

export default memo(ChatItem)

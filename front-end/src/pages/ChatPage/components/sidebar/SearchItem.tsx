import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'
import { Box, Flex, Avatar, Stack, Skeleton } from '@chakra-ui/react'

import { getAllUsers } from 'redux/actions/user'
import CardItem from 'pages/ChatPage/utils/CardItem'

type TypeSearchItem = {
   searchText: string
}

const SearchItem = ({ searchText }: TypeSearchItem) => {
   const { isLoading, isFetching, error, data, refetch } = useQuery<
      AxiosResponse,
      AxiosError
   >(['users', searchText], () => getAllUsers(searchText), {
      enabled: false,
   })

   useEffect(() => {
      searchText && refetch()
   }, [searchText])

   return (
      <>
         {!isLoading &&
            data?.data.data.map(
               (el: { name: string; avatar: string }, index: number) => (
                  <CardItem
                     key={index}
                     index={index}
                     data={{ name: el.name, avatar: el.avatar }}
                  />
               )
            )}

         {data && !data?.data.data.length && (
            <Box
               background="#fff"
               color="#000"
               margin="15px 0 15px 0"
               width="100%"
               padding="7px"
               borderRadius="5px"
            >
               Sorry! No users by that name
            </Box>
         )}

         {(isLoading || isFetching) && (
            <Stack marginTop="20px">
               <Skeleton height="50px" />
               <Skeleton height="50px" />
               <Skeleton height="50px" />
            </Stack>
         )}
      </>
   )
}

export default SearchItem

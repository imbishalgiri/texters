import React, { useState } from 'react'
import { useQuery } from 'react-query'
import {
   Box,
   Center,
   InputGroup,
   Input,
   InputRightElement,
   HStack,
   Stack,
   Button,
   Skeleton,
   Flex,
   Avatar,
} from '@chakra-ui/react'
import { getAllUsers } from 'redux/actions/user'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from 'redux/actions/auth'
import { Group } from 'framer-motion/types/components/Reorder/Group'

// this is a main component
const Sidebar = () => {
   const [searchText, setSearchText] = useState('')

   const { isLoading, isFetching, error, data, refetch } = useQuery<
      AxiosResponse,
      AxiosError
   >(['users', searchText], () => getAllUsers(searchText), { enabled: false })

   const searchUser = () => {
      console.log('clicked')
      refetch()
   }
   console.log('isLoading', isLoading)
   return (
      <Box
         borderRadius="10px"
         background="royalBlue"
         height="80vh"
         width="17vw"
         margin="0 60px 0 30px"
         padding="25px"
      >
         <InputGroup>
            <Input
               color="#fff"
               value={searchText}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchText(e.target.value)
               }
               pr="5rem"
               placeholder="search user"
               size="md"
            />
            <InputRightElement width="70px">
               <Button size="md">
                  <Box fontSize="12px" cursor="pointer" onClick={searchUser}>
                     search
                  </Box>
               </Button>
            </InputRightElement>
         </InputGroup>
         {!isLoading &&
            data?.data.data.map(
               (el: { name: string; avatar: string }, index: number) => (
                  <Box
                     key={index}
                     background="#fff"
                     color="#000"
                     margin="15px 0 15px 0"
                     width="100%"
                     padding="7px"
                     borderRadius="5px"
                  >
                     <Flex>
                        <Avatar
                           name={el?.name}
                           src={el.avatar}
                           marginLeft="0"
                        />
                        <Box marginLeft="10px">
                           <strong>{el?.name}</strong>
                           <br />
                           <small>what is up??</small>
                        </Box>
                     </Flex>
                  </Box>
               )
            )}

         {(isLoading || isFetching) && (
            <Stack marginTop="20px">
               <Skeleton height="50px" />
               <Skeleton height="50px" />
               <Skeleton height="50px" />
            </Stack>
         )}
      </Box>
   )
}

export default Sidebar

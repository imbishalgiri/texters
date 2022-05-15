import React, { useEffect, useCallback, useState } from 'react'

import {
   Box,
   InputGroup,
   Input,
   InputRightElement,
   Button,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import ChatItem from './ChatItem'
import SearchItem from './SearchItem'
// this is a main component

const Sidebar = () => {
   const [searchText, setSearchText] = useState('')
   const [connectionStatus, setConnectionStatus] = useState(false)

   const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value),
      [searchText]
   )

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
               onChange={handleChange}
               pr="5rem"
               placeholder="search user"
               size="md"
            />
            {searchText && (
               <InputRightElement width="70px">
                  <CloseIcon
                     cursor="pointer"
                     color="#fff"
                     w={4}
                     h={4}
                     onClick={() => setSearchText('')}
                  />
               </InputRightElement>
            )}
         </InputGroup>
         {!searchText && <ChatItem />}
         {searchText && <SearchItem searchText={searchText} />}
      </Box>
   )
}

export default Sidebar

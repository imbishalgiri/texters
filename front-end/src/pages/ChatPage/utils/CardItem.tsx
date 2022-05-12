import React from 'react'
import { Box, Flex, Avatar, Center } from '@chakra-ui/react'

type CardItemType = {
   index: number
   data: {
      name: string
      avatar: string
   }
   latestMessage?: string
   clickFunction: () => void
}

const CardItem = ({
   index,
   data,
   latestMessage,
   clickFunction,
}: CardItemType) => (
   <Box
      key={index}
      background="#fff"
      color="#000"
      margin="15px 0 15px 0"
      width="100%"
      padding="7px"
      borderRadius="5px"
      cursor="pointer"
      transition=".5s ease"
      _hover={{ background: ' #cecff0' }}
      onClick={clickFunction}
   >
      <Flex alignItems="center">
         {data.avatar && (
            <Avatar name={data?.name} src={data.avatar} marginLeft="0" />
         )}
         <Box marginLeft="10px">
            <strong>{data?.name}</strong>
            <br />
            {latestMessage && <small>{latestMessage?.slice(0, 20)}...</small>}
         </Box>
      </Flex>
   </Box>
)

export default CardItem

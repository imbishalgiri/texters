import React from 'react'
import { Box, Flex, Avatar } from '@chakra-ui/react'

type CardItemType = {
   index: number
   data: {
      name: string
      avatar: string
   }
}

const CardItem = ({ index, data }: CardItemType) => (
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
   >
      <Flex>
         {data.avatar && (
            <Avatar name={data?.name} src={data.avatar} marginLeft="0" />
         )}
         <Box marginLeft="10px">
            <strong>{data?.name}</strong>
            <br />
            <small>what is up??</small>
         </Box>
      </Flex>
   </Box>
)

export default CardItem

import React, { useEffect } from 'react'
import { HStack, Avatar, Box, Spacer } from '@chakra-ui/react'

type sender = {
   avatar?: string
   name: string
   text: string
}

type receiver = {
   text: string
}

const ReceiverItem = ({ avatar, name, text }: sender) => {
   return (
      <HStack margin={-2}>
         {avatar && (
            <Avatar name={name} src={avatar} margin="1rem 0 1rem 1rem" />
         )}
         <Box
            borderRadius="1rem"
            padding=".5rem 1rem"
            background="#d6d2d2"
            minWidth="2.2rem"
            maxW="20rem"
            margin={`${!avatar ? '.8rem 4.3rem' : '0'}`}
         >
            {text}
         </Box>
      </HStack>
   )
}
const SenderItem = ({ text }: receiver) => (
   <>
      <Spacer />
      <Box
         borderRadius="1rem"
         padding=".5rem 1rem"
         background="#3809f7a1"
         minWidth="2.2rem"
         maxW="20rem"
         color="#fff"
         alignSelf="flex-end"
         marginTop=".5rem"
      >
         {text}
      </Box>
   </>
)

export { SenderItem, ReceiverItem }

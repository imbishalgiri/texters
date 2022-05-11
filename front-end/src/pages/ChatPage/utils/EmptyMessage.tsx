import React from 'react'
import { Flex, Box, Spinner } from '@chakra-ui/react'

const EmptyMessage = () => (
   <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
   >
      <div>
         <strong>You Guys do not have any messages yet !!!</strong>
         <br />
      </div>

      <Box>Please write your first message</Box>
   </Flex>
)

export const MessageSpinner = () => (
   <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
   >
      <Spinner size="xl" />
   </Flex>
)

export default EmptyMessage

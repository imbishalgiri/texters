import React from 'react'
import {
   Box,
   Center,
   InputGroup,
   Input,
   InputRightElement,
   Button,
} from '@chakra-ui/react'

// this is a main component
const Sidebar = () => (
   <Box
      borderRadius={'10px'}
      background={'royalBlue'}
      height={'80vh'}
      width={'17vw'}
      margin={'0 60px 0 30px'}
      padding={'25px'}
   >
      <InputGroup>
         <Input color={'#fff'} placeholder="search user" size={'md'} />
         <InputRightElement width={'70px'}>
            <Button size="md">
               <Box fontSize={'12px'}>search</Box>
            </Button>
         </InputRightElement>
      </InputGroup>
      <Box
         background={'#fff'}
         color="#000"
         margin={'15px 0 15px 0'}
         width={'100%'}
         padding="7px"
         borderRadius="5px"
      >
         <Center>i am search item</Center>
      </Box>
   </Box>
)

export default Sidebar

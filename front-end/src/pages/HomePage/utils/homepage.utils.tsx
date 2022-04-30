/*
    This file contains all the utility components required for homepage
    Feel free to break stuffs into components
*/
import React, { useEffect } from 'react'
import {
   InputGroup,
   InputRightElement,
   Input,
   FormControl,
   FormLabel,
   FormHelperText,
   FormErrorMessage,
   Tab,
   forwardRef,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

// ------------------------------------- End of Imports

// Modified Tab component (removed default focus behavior)
type TabProps = {
   children: string
}

// tab component
const CleanTab: React.FC<TabProps> = ({ children }) => {
   return (
      <Tab
         _focus={{
            boxShadow: 'none',
         }}
         borderRadius={'10px 10px 0 0'}
         transition={'border-top .3s ease'}
         _selected={{
            border: '1px solid blue',
            borderTop: '5px solid blue',
            borderBottom: 'none',
            boxShadow: '0px 5px rgba(230, 230, 239)',
         }}
      >
         {children}
      </Tab>
   )
}

const PasswordInput = ({
   isRequired,
   value = '',
   onChange = () => {},
   error = false,
   label,
   placeholder,
}: any) => {
   const [show, setShow] = React.useState(false)
   const handleClick = () => setShow(!show)

   return (
      <FormControl isInvalid={error}>
         <FormLabel htmlFor="email">
            {label} {isRequired && <span style={{ color: 'red' }}> *</span>}
         </FormLabel>

         <InputGroup size="md">
            <Input
               borderColor={'blue'}
               pr="4.5rem"
               type={show ? 'text' : 'password'}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
            />
            <InputRightElement width="4.5rem">
               <div style={{ cursor: 'pointer' }} onClick={handleClick}>
                  {show ? (
                     <ViewOffIcon color={!error ? 'blue' : 'red'} />
                  ) : (
                     <ViewIcon color={!error ? 'blue' : 'red'} />
                  )}
               </div>
            </InputRightElement>
         </InputGroup>
         {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
         {!error && <FormHelperText>This field is required.</FormHelperText>}
      </FormControl>
   )
}

export { CleanTab, PasswordInput }

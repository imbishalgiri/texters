import React, { FC } from 'react'
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Input,
} from '@chakra-ui/react'
import { PasswordInput } from './homepage.utils'

const onLoginSubmit = (data: any) => {
   console.log('data -->', data)
}
import { useForm, Controller } from 'react-hook-form'
import { CleanButton } from './homepage.styles'

// ------- (main component)
const Login: FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm()
   return (
      <form onSubmit={handleSubmit(onLoginSubmit)}>
         {/* ------------------------------------- (email field)  */}
         <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">
               Email address <span style={{ color: 'red' }}> *</span>
            </FormLabel>
            <Input
               placeholder="Enter Email Here"
               borderColor={'blue'}
               id="email"
               {...register('email', {
                  required: 'Please enter email.',
                  pattern: {
                     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                     message: 'Invalid Email format',
                  },
               })}
            />

            {errors.email ? (
               <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            ) : (
               <FormHelperText>This field is required.</FormHelperText>
            )}
         </FormControl>
         <br />
         {/* ------------------------------------- (password field) */}
         <Controller
            render={({ field: { ref, ...rest } }) => (
               <PasswordInput
                  label="Password"
                  placeholder="Enter Password"
                  isRequired
                  error={errors.password}
                  {...rest}
               />
            )}
            name="password"
            control={control}
            rules={{
               required: 'Please enter password.',
               minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
               },
            }}
         />
         <br />
         {/* -------------------------------------------- (submit area) */}
         <CleanButton
            _hover={{ backgroundColor: 'royalblue' }}
            _focus={{ boxShadow: 'none' }}
            type="submit"
         >
            Login
         </CleanButton>
      </form>
   )
}

export default Login

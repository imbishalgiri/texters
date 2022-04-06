import React, { FC, useEffect } from 'react'
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Input,
   useToast,
} from '@chakra-ui/react'

import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { signup, User } from 'redux/actions/auth'
import { PasswordInput } from './homepage.utils'
import { CleanButton } from './homepage.styles'

// ----------------- (Main Component)
const Signup: FC = () => {
   // ----------------------- (Container Part)
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
      control,
      watch,
      setFocus,
   } = useForm<User>()
   const navigate = useNavigate()
   const Toast = useToast()
   // (watching password to confirm password)
   const password = watch('password')
   // (useMutation <type of data useMutation Returns, error, type for callback>)
   const { mutate, isError, error, isLoading, data } = useMutation<
      User,
      AxiosError,
      User
   >((newUser) => {
      return signup(newUser)
   })
   // --------------- (submit handeler: Signup)
   const onSignupSubmit = ({ name, email, password }: User) => {
      mutate({
         name,
         email,
         password,
      })
   }
   // (error handeling useEffect)
   useEffect(() => {
      // when backend responds error
      if (isError) {
         if (error.response?.data?.field === 'email') {
            setError('email', {
               type: 'custom',
               message: 'This user already exists',
            })
            setFocus('email')
         }
      }
      // when backend responds with success data
      if (data) {
         navigate('/#login')
         Toast({
            title: 'Signed Up',
            description: 'Please login now',
            status: 'success',
            position: 'top-right',
            duration: 7000,
            isClosable: true,
         })
      }
   }, [error, data])

   // ------------------------------------------- (presentational part)
   return (
      <form onSubmit={handleSubmit(onSignupSubmit)}>
         {/* ------------------------------------------ (name field)  */}
         <FormControl isInvalid={errors.name && true}>
            <FormLabel htmlFor="email">
               Name <span style={{ color: 'red' }}> *</span>
            </FormLabel>
            <Input
               placeholder="Enter Name Here"
               borderColor={'blue'}
               id="name"
               {...register('name', {
                  required: 'Please enter name.',
                  minLength: {
                     value: 3,
                     message: 'Name must have at least 3 characters',
                  },
               })}
            />
            {errors.name ? (
               <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            ) : (
               <FormHelperText>This field is required.</FormHelperText>
            )}
         </FormControl>
         <br />
         {/* ------------------------------------------ (email field)  */}
         <FormControl isInvalid={errors.email && true}>
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
         {/* ------------------------------------------ (password field)  */}
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
         {/* -------------------------------------- (confirm password field)  */}
         <Controller
            render={({ field: { ref, ...rest } }) => (
               <PasswordInput
                  label="Password"
                  placeholder="Confirm Password"
                  isRequired
                  error={errors.passwordConfirm}
                  {...rest}
               />
            )}
            name="passwordConfirm"
            control={control}
            rules={{
               required: 'Please confirm  password.',
               validate: (value) =>
                  value === password || 'Passwords do not match.',
            }}
         />
         <br />

         <CleanButton
            isLoading={isLoading}
            loadingText={'Signing Up'}
            _hover={{ backgroundColor: 'royalblue' }}
            _focus={{ boxShadow: 'none' }}
            type="submit"
         >
            Sign Up
         </CleanButton>
      </form>
   )
}

export default Signup

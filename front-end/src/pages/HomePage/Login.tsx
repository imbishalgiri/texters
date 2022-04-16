import React, { FC, useEffect } from 'react'
import jwt from 'jwt-decode'
import { useAppDispatch } from 'redux/hooks'
import { login } from 'redux/slices/authSlices'
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Input,
} from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { PasswordInput } from './homepage.utils'
import { loginAction, UserLogin } from 'redux/actions/auth'

import { useForm, Controller } from 'react-hook-form'
import { CleanButton } from './homepage.styles'

// ------- (main component)
const Login: FC = () => {
   const {
      register,
      handleSubmit,
      setError,
      setFocus,
      formState: { errors },
      control,
   } = useForm<UserLogin>()

   const dispatch = useAppDispatch()

   const { mutate, isError, error, isLoading, data } = useMutation<
      UserLogin,
      AxiosError,
      UserLogin<AxiosResponse>
   >((userTryingToLogin) => {
      return loginAction(userTryingToLogin)
   })

   // --------------- (submit handeler: Signup)
   const onLoginSubmit = ({ email, password }: UserLogin) => {
      mutate({
         email,
         password,
      })
   }

   useEffect(() => {
      if (error) {
         let errorMessage = error.response?.data?.data

         if (errorMessage?.field === 'email') {
            setError('email', {
               type: 'custom',
               message: errorMessage?.message,
            })
            setFocus('email')
         }
         if (errorMessage?.field === 'password') {
            setError('password', {
               type: 'custom',
               message: errorMessage?.message,
            })
         }
      }
      if (data) {
         //   todo: make this dispatch real data to the redux store
         const response = data?.data
         const decoded = jwt<{
            user: { name: string; email: string; id?: string }
         }>(response?.token)
         dispatch(
            login({
               user: { name: decoded?.user?.name, email: decoded?.user?.email },
            })
         )
         localStorage.setItem('chatAppToken', response?.token)
      }
   }, [data, isError])
   return (
      <form onSubmit={handleSubmit(onLoginSubmit)}>
         {/* ------------------------------------- (email field)  */}
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
         {/* ------------------------------------- (password field) */}
         <Controller
            render={({ field: { ref, value, ...rest } }) => {
               return (
                  <PasswordInput
                     label="password"
                     id="password"
                     placeholder="Enter Password"
                     isRequired
                     value={value}
                     error={errors.password}
                     {...rest}
                  />
               )
            }}
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
            isLoading={isLoading}
            loadingText={'Logging In'}
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

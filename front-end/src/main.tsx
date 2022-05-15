import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import Store from 'redux/store'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
      },
   },
})

ReactDOM.render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <Provider store={Store}>
            <ChakraProvider>
               <BrowserRouter>
                  <App />
               </BrowserRouter>
            </ChakraProvider>
            <ReactQueryDevtools
               initialIsOpen={false}
               position={'bottom-right'}
            />
         </Provider>
      </QueryClientProvider>
   </React.StrictMode>,
   document.getElementById('root')
)

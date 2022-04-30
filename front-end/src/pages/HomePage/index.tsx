import React, { FC, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import {
   HomepageBox,
   CenterFlex,
   Overlay,
   MiddleBox,
} from './styles/homepage.styles'
import { CleanTab } from './utils/homepage.utils'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import Signup from './components/Signup'

// ----------------------- (End of Imports)

// --------  (Main homepage component)
const HomePage: FC = () => {
   const [tab, setTab] = useState(0)
   const navigate = useNavigate()
   const urlLocation = useLocation()
   const user = useSelector((state: RootState) => state.auth)
   useEffect(() => {
      const urlAndTabMapping = {
         login: 0,
         signup: 1,
      }
      let route = urlLocation.hash.slice(1) as keyof typeof urlAndTabMapping
      setTab(urlAndTabMapping[route])
      if (user.user?.isLoggedIn) {
         navigate('/chatpage')
      }
   }, [urlLocation])

   const handleTabsChange = (index: number) => {
      index === 0 ? navigate('/#login') : navigate('/#signup')
   }

   return (
      <>
         <HomepageBox>
            <CenterFlex w={'100vw'} h={'100vh'} color={'#fff'}>
               <MiddleBox mt={'4rem'} fontSize={'3xl'}>
                  Welcome To Texters
               </MiddleBox>
               <MiddleBox mt={'2rem'} p={'1rem'}>
                  <Tabs
                     key={tab}
                     defaultIndex={tab}
                     isFitted
                     variant="unstyled"
                     width={'100%'}
                     onChange={handleTabsChange}
                  >
                     <TabList mb="1em" borderBottom={'1px solid blue'}>
                        <CleanTab>Login</CleanTab>
                        <CleanTab>Sign Up</CleanTab>
                     </TabList>
                     <TabPanels>
                        <TabPanel>
                           <Login />
                        </TabPanel>
                        <TabPanel>
                           <Signup />
                        </TabPanel>
                     </TabPanels>
                  </Tabs>
               </MiddleBox>
            </CenterFlex>
         </HomepageBox>
         <Overlay />
      </>
   )
}

export default HomePage

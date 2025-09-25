"use client"
import Navbar from '@/component/Navbar'
import { MainContextProvider } from '@/context/MainContext'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const MainLayout = ({children}) => {
  return (
    
    <Provider store={store}>
      <MainContextProvider>
      <ToastContainer/>
      <Navbar/>
        {children}
      </MainContextProvider>
    </Provider>
  
  )
}

export default MainLayout
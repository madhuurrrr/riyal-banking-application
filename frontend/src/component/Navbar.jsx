"use client"
import React from 'react'
import Logo from './reusable/Logo'
import Link from 'next/link'
import { useMainContext } from '@/context/MainContext'
import { IoMenu } from "react-icons/io5";
import { useDispatch } from 'react-redux'
import { setIsToggle, SidebarSlicePath } from '@/redux/slice/sidebarSlice';
const Navbar = () => {

    const {user,LogoutHandler} = useMainContext()
    const dispatch = useDispatch()
  return (
    <>
            <header className='w-full border-b rotate-b-md'>
        <nav className='w-[98%] lg:w-[80%] py-3 mx-auto flex items-center justify-between'>
            
            <div className='flex items-center gap-x-2'>
                <button onClick={()=>dispatch(setIsToggle())} className='bg-gray-100 rounded-full p-2 sm:hidden text-xl hover:bg:gray-20 cursor-pointer'><IoMenu /></button>
                <Logo/>
            </div>
            <ul className='flex items-center justify-between gap-x-2'>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
            
                <li>
                    <Link href={'/about'}>About</Link>
                </li>
                {user ?<>
                <li>
                    <button onClick={LogoutHandler} className='bg-[#002855] hover:bg-[#33415C] text-white px-4 py-1 cursor-pointer font-medium rounded'>Logout</button>
                </li>
              </>:  <li>
                    <Link href={'/login'}>Login</Link>
                </li>}
                
            </ul>

        </nav>

            </header>
    </>
  )
}

export default Navbar
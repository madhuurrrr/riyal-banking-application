"use client";
import { useMainContext } from '@/context/MainContext';
import Loader from "@/component/Loader";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiCoinsBold } from "react-icons/pi";
import { setIsToggle, SidebarSlicePath } from '@/redux/slice/sidebarSlice';
import Link from 'next/link';

const RootTemplate = ({ children }) => {
  const { user } = useMainContext(); 
  const [loading,setLoading] = useState(true)

  const router = useRouter();  
  const isToggle = useSelector(SidebarSlicePath)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      router.push("/login");   
    }else{
      setLoading(false)
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#002855] hover:bg-[#33415C] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const CustomMenu = ({link,text,Icon})=>{
    const pathname= usePathname()
    return <>
    <MenuItem
    style={{
      background:pathname === link?'#002855':'#ffff',
      color:pathname === link?'white':'black',
      borderRadius:pathname === link?"10px":'0px'
    }}
    icon={<Icon className="text-2xl" />}
    component={<Link href={link} />}> {text} </MenuItem>
    </>
  }

  return <>
    <section className='flex items-start'>
      <Sidebar breakPoint='lg' toggled={isToggle} onBackdropClick={()=>dispatch(setIsToggle())}>
        <Menu className='!bg-white !min-h-screen lg:!min-h-[90vh] px-3 py-10'>
          
          <CustomMenu link={'/'} text={'Home'} Icon={MdDashboard } />
          <CustomMenu link={'/amount'} text={'Amount'} Icon={PiCoinsBold} />
          <CustomMenu link={'/profile'} text={'Profile'} Icon={CgProfile} />

        </Menu>
      </Sidebar>
      <main className='px-1 md:px-3 w-full'>
        {children}
      </main>
    </section>
  </>;
};

export default RootTemplate;

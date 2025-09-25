import Link from 'next/link';
import React from 'react'
import { PiCoinsBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { RiBankCardFill } from "react-icons/ri";
import HeaderName from '@/component/reusable/HeaderName'


const HomePage=()=>{

  const dashboard_data = [
    { title: "Total Balance",
      "Icon": <PiCoinsBold className='text-6xl text-yellow-500'/>,
      "value": 5000,
      link: "/amount" 
    },
    { title: "Total FD Amount",
      "Icon": <HiOutlineBanknotes className='text-6xl text-lime-800'/>,
      "value": 5000,
      link: "/fd-amount" 
    },
    { title: "Total Cards",
      "Icon": <RiBankCardFill className='text-6xl text-black-500'/>,
      "value": 5000,
      link: "/atm-cards" 
    },
  ];
  return <>
  <div className="py-10 flex flex-col gap-y-4">
    <HeaderName/>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3"></div>


    {
      dashboard_data.map((cur,i)=>{
        return <DashboardCard data={cur} key={i}/>
      })
    }
  </div>
  </>
}

export default HomePage

const DashboardCard = ({data})=>{
  return (
    <Link href={data.link} className="flex items-center justify-between border py-3 no-underline hover:bg-gray-100 transition-colors">
      {data.Icon}
      <div className="flex flex-col gap-y-3 justify-end">
        <p className='text-3xl font-semibold'>{data.title}</p>
        <h3 className='text-4xl font-bold text-end'>&#8377; {data.value}</h3>
      </div>
    </Link>
  );
}
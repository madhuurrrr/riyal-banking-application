import HeaderName from '@/component/reusable/HeaderName'
import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import AddAmountModal from '@/component/Amount/AddAmountModal';

const AmountPage = () => {
  return (
    <>
    <div className="container py-10">
        <HeaderName/>
        <div className='card w-1/3 border py-5 rounded flex items-center justify-between px-3'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>Add Amount</h1>
            <p> Total Amount : 150/-</p>
          </div>
          <AddAmountModal/>
        </div> 
    </div>
    </>
  )
}

export default AmountPage
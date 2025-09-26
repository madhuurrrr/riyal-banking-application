"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Field, Formik } from 'formik';
import { Fragment, useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SiRazorpay } from "react-icons/si";
import { toast } from 'react-toastify';
import * as yup from 'yup';


export default function AddAmountModal() {
  let [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading]= useState(false)

  const initial_state = {
    amount:0
  }

  const validationSchema = yup.object({
    amount: yup.number().min(1, "Amount must be at least 1 INR").required("Amount is required")
  })

  const onSubmitHandler = (values,{resetForm}) => {
    
    try {
      setLoading(true)
      console.log(values);
      toast.success("Payment Successful")
      resetForm()
    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    } finally {
      setLoading(false)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
        <button type="button"
          onClick={openModal} className='text-3xl text-[#0353A4] hover:text-[#002855] cursor-pointer'><IoMdAddCircleOutline /></button> 

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all rounded-xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    <span>Add Payment</span>

                    <button className='text-2xl text-[#0353A4] hover:text-[#002855] p-2  cursor-pointer' onClick={closeModal}><IoMdCloseCircleOutline /></button>
                  </Dialog.Title>

                    <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initial_state}>
                      {({values, handleSubmit}) => (
                        <form onSubmit={handleSubmit} className='w-[96%] lg:w-[80%] mx-auto'>
                          <div className='mb-3 flex items-center gap-x-2 border w-full px-2'>
                            <RiMoneyRupeeCircleLine className='text-2xl' /><Field
                            name="amount"
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                            type='text' className='w-full py-2 outline-none border-none rounded' placeholder='Enter amount'/>
                          </div>
                          <div className='mb-3 flex justify-end w-full'>
                            <button disabled={values.amount < 1 || loading} className='px-5 flex items-center gap-x-2 bg-[#0353A4] hover:bg-[#002855] text-white py-2 disabled:bg-[#7D8597] rounded'>
                              <span>Pay</span><SiRazorpay />
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

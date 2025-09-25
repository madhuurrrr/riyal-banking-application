"use client";

import { axiosClient } from '@/utils/AxiosClient';
import React, { useState } from 'react';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import CustomAuthButton from '@/component/reusable/CustomAuthButton';
import { Link } from 'lucide-react';
import { useMainContext } from '@/context/MainContext';
import { useRouter } from 'next/navigation';


const LoginPage = () => {

  const [loading,setLoading]= useState(false)
  const {fetchUserProfile} = useMainContext()
  const router = useRouter()

  const initialValues= {
    email: '',
    password: '',
  }

  const validationSchema = yup.object({
    email : yup.string().email("Email must be a valid Email").required("Email is Required"),
    password : yup.string().required("Password is Required"),
  })

  const onSubmitHandler = async(values, helpers) => {
    try {

      const response = await axiosClient.post('/auth/login', values)
      const data = await response.data


      toast.success(data.msg)

      //token
      localStorage.setItem("token", data.token)

      await fetchUserProfile()

      router.push("/")
      helpers.resetForm()

    } catch (error) {
      console.error('Login  failed:', error.message);
      toast.error(error.response.data.msg || error.message)
    }
  }

  return (
   
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#002855] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl rounded-2xl bg-[#001233] border border-[#979DAC] overflow-hidden shadow-2xl">
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
            <img 
              src="/Images/Logo.png" 
              alt="Riyal Bank Logo" 
              className="max-w-xs w-full h-auto"
            />

        </div>

        <div className="hidden lg:block w-px bg-[#979DAC] self-stretch"></div>

        <div className="w-full lg:w-1/2 p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
            >
              <Form>
                <div className="flex flex-col gap-4">
                  <p className="text-center text-3xl font-bold text-gray-200 mb-4">Login to your Account</p>
                  
                  <div>
                    <Field 
                      type="email"
                      name='email'
                      className="bg-[#001233] w-full rounded-lg border border-[#979DAC] px-4 py-3
                        text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 
                        focus:ring-offset-2 focus:ring-offset-[#001233]" 
                      placeholder="Email" 
                    />
                    <ErrorMessage name='email' className='text-red-500 text-sm mt-1' component={'p'} />
                  </div>
                  
                  <div>
                    <Field 
                      type="password"
                      name='password'
                      className="bg-[#001233] w-full rounded-lg border border-[#979DAC] px-4 py-3
                        text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 
                        focus:ring-offset-[#001233]" 
                      placeholder="Password" 
                    />
                    <ErrorMessage name='password' className='text-red-500 text-sm mt-1' component={'p'} />
                  </div>
                  
                  <CustomAuthButton isLoading={loading} text={'Login'} type='submit'/>
                </div>
                <div className="mt-4 text-end">
                  <a href={'/register'} className="text-sm  text-white hover:underline">
                    Don't have an Account?
                  </a>
                </div>
              </Form>
            </Formik>
        </div>
      </div>
    </div>
  )
}


export default LoginPage;

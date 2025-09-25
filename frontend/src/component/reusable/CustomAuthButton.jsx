import clsx from 'clsx'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const CustomAuthButton = ({
  isLoading = false,
  type = "submit",
  text,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      disabled={isLoading}
      className={clsx(
        "mt-4 inline-block cursor-pointer rounded-md bg-[#002855] px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-[#0353A4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95",
        className
      )}
    >
      <span>{text}</span>
      {isLoading && <CgSpinner className="ml-2 animate-spin inline-block" />}
    </button>
  )
}

export default CustomAuthButton

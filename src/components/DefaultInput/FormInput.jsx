import React,{forwardRef } from 'react'

const FormInput = forwardRef (({type,label,...props}, ref)  => {
  return (
    <div>
    <label className="mb-3 block text-sm font-bold text-slate-700 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      placeholder={label}
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-400 active:border-green-400 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      {...props}  
    ref={ref}
   />
  </div>
              
  )
});

export default FormInput;
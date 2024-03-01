import React from "react";


export default function AuthInputComponent({label, name, value, type, onChange, required}){
  return(
    <div className="flex flex-col h-[90px] md:h-auto items-start justify-start w-[448px] sm:w-full">
      <label className="text-gray-600 text-sm tracking-[0.07px] mb-2 w-auto">{label}</label>
      <input 
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        type={type || "text"}
       className="!placeholder:text-gray-900 p-3 !text-gray-900 font-inter p-0 text-left text-lg tracking-[0.09px] border border-gray-200 border-solid w-full rounded-xl" />
    </div>
  )
}
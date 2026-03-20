import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"

export default function ChipInput({
    // Props to be passed to the component
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
  }) {

    const [chips,setChips]=useState([]);
    const { editCourse, course } = useSelector((state) => state.course)

   // console.log("state course: ",course);

     // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }
  //funtion to delete chip
  const handleDeleteChip = (index)=>{
    const removedChip = chips.filter((chip,idx)=>idx !== index );
    setChips(removedChip);
  }

  useEffect(()=>{
    setValue(name,chips)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chips])

  useEffect(()=>{
    if(editCourse){
        setChips(course?.tag)
    }
    register(name,{required:true,validate: (value)=>value.length>0})
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='flex flex-col space-y-4'>
       {/* Render the label for the input */}
       <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]" htmlFor={name}>
        {label} <sup className="text-red-500 font-bold">*</sup>
      </label>

       {/* Render the chips and input */}
       <div className='flex w-full flex-wrap gap-3 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5 transition-all duration-300'>
        {/* Map over the chips array and render each chip */}
            {
                chips.map((chip,index)=>(
                <div
                key={index}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-indigo-600/20 group hover:scale-105 transition-transform duration-300">
                {/* Render the chip value */}
                <span className="tracking-tight">{chip}</span>
                {/* Render the button to delete the chip */}
                <button
                  type="button"
                  className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center hover:bg-red-500 transition-colors shadow-inner"
                  onClick={() => handleDeleteChip(index)}
                >
                  <MdClose className="text-xs" />
                </button>
            </div>
                ))
            }

        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={chips.length === 0 ? placeholder : "Add more..."}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white px-2 py-1.5 text-sm font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 min-w-[150px]"
        />

       </div>
                 {/* Render an error message if the input is required and not filled */}
            {errors[name] && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  At least one {label.toLowerCase()} is required
                </span>
            )}
    </div>
  )
}

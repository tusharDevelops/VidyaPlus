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
    <div className='flex flex-col space-y-3'>
       {/* Render the label for the input */}
       <label className="text-sm font-semibold text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

       {/* Render the chips and input */}
       <div className='flex w-full flex-wrap gap-2 rounded-lg bg-richblack-800 p-3 border border-richblack-700 focus-within:border-yellow-50 transition-all duration-200'>
        {/* Map over the chips array and render each chip */}
            {
                chips.map((chip,index)=>(
                <div
                key={index}
                className="flex items-center rounded-full bg-gradient-to-r from-yellow-100 to-yellow-50 px-3 py-1.5 text-sm text-richblack-900 font-semibold shadow-sm hover:shadow-md transition-all duration-200">
                {/* Render the chip value */}
                <span>{chip}</span>
                {/* Render the button to delete the chip */}
                <button
                type="button"
                className="ml-2 focus:outline-none hover:opacity-70 transition-opacity p-1"
                onClick={() => handleDeleteChip(index)}
                >
                <MdClose className="text-base" />
                </button>
            </div>
                ))
            }

        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[150px] bg-transparent text-richblack-5 placeholder:text-richblack-400 focus:outline-none text-sm"
        />

       </div>
                {/* Render an error message if the input is required and not filled */}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200 font-semibold">
                {label} is required
                </span>
            )}
    </div>
  )
}

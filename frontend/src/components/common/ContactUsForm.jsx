import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from '../../data/countrycode.json'
import {contactusEndpoint} from '../../services/apis'
import {apiConnector} from '../../services/apiConnector'
import toast from 'react-hot-toast'

export default function ContactUsForm() {

    const [loading,setLoading] = useState(false);
    const{register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data)=>{
      const toastid = toast.loading("SENDING YOUR REQUEST SECURELY");
      try {
        setLoading(true);
        
        await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data);
        //console.log("this is e res", output);
        setLoading(false);
        toast.dismiss(toastid);
        toast.success("YOUR REQUEST SENT TO STUDYNOTION");
      } catch (error) {
        toast.dismiss(toastid);
        toast.error("SOMETHING WENT WRONG");

        setLoading(false);
      }
    }

    useEffect(()=>{
      reset(
      { 
         email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      }
      )
    },[reset,isSubmitSuccessful]);

  return (
    <form
        className="flex flex-col gap-7"
       onSubmit={handleSubmit(submitContactForm)}
      >

      {/* FIRST_NAME_LAST_NAME_DIV */}
      <div className='flex flex-col gap-8 lg:flex-row'>
        {/* FIRST_NAME_DIV */}
        <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label className='text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] px-1' htmlFor='firstname'>First Name</label>
            <input
                name='firstname'
                id='firstname'
                placeholder='Enter First Name'
                className='form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm'
                {...register("firstname",{required:true})}
            />
            {errors.firstname && (<span className='mt-2 text-[10px] font-black text-rose-500 uppercase tracking-wider px-1'>Please enter your first name</span>)}
        </div>
         {/* LAST_NAME_DIV */}
         <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label className='text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] px-1' htmlFor='lastname'>Last Name</label>
            <input
                className='form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm'
                id='lastname'
                name='lastname'
                placeholder='Enter Last Name'
                {...register("lastname", {required: true})}
            />
        </div>
      </div>

       {/* EMAIL_ADDRESS_DIV */}
      <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] px-1'>Email Address</label>
            <input
                id='email'
                name='email'
                className='form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm'
                placeholder='Enter Email Address'
                {...register("email", {required: true} )}
            />
               {errors.email && (
                <span className="mt-2 text-[10px] font-black text-rose-500 uppercase tracking-wider px-1">
                    Please enter your Email address.
                </span>
                )}
      </div>

      {/* PHONE_NUMBER_DIV */}
      <div className='flex flex-col gap-2'>
        <label className='text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] px-1' htmlFor='phonenumber'>Phone Number</label>
        {/* COUNTRY_CODE_&_PHONE_NUMBER_INPUT */}
        <div className='flex gap-5'>
            {/* COUNTRY_CODE */}
            <div className='flex w-[120px] flex-col gap-2'>
            <select 
              name="countrycode"
              id="countrycode"
              className='form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-5 rounded-2xl font-bold text-sm appearance-none cursor-pointer'
              {...register("countrycode",{required:true})}
              >
                {
                    CountryCode.map((ele,i)=>{
                      return(
                        <option key={i} value={ele.code} className='bg-white dark:bg-slate-900'>
                        {ele.code} - {ele.country}
                        </option>
                      )
                    })
                }
            </select>

            </div>

            {/* PHONE_NUMBER */}
            <div className='flex w-[calc(100%-140px)] flex-col gap-2'>
                <input
                  type='number'
                  id='phonenumber'
                  name='phonenumber'
                  placeholder='1234567890'
                  className='form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm'
                  {...register("phoneNo", {
                    required:{
                      value:true,
                      message: "Please enter your phone number"
                  },
                  maxLength:{value: 12,message:"Invalid number"},
                  minLength:{value: 10, message: "Invalid number"}
                  })}
                />
            </div>
        </div>
        {errors.phoneNo && ( <span className="mt-2 text-[10px] font-black text-rose-500 uppercase tracking-wider px-1">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* MESSAGE_DIV */}
      <div className='flex flex-col gap-2'>
        <label htmlFor='message' className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] px-1">Message</label>
        <textarea 
        name='message'
        id='message'
        className='form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm min-h-[150px]'
        placeholder="How can we help you?"
        {...register("message", { required: true })}
        />
            {errors.message && (
          <span className="mt-2 text-[10px] font-black text-rose-500 uppercase tracking-wider px-1">
            Please enter your message.
          </span>
        )}
      </div>

      {/* BUTTON */}
      <button
        disabled={loading}
        type='submit'
        className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-sm"
      >
        {loading ? "Transmitting..." : "Initialize Contact"}
      </button>
        
      

    </form>
  )
}

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
        
        const output = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data);
        //console.log("this is e res", output);
        setLoading(false);
        toast.dismiss(toastid);
        toast.success("YOUR REQUEST SENT TO STUDYNOTION");
      } catch (error) {
        toast.dismiss(toastid);
        toast.error("SOMETHING WENT WRONG");
        console.log("ERROR MESSAGE - ", error.message)
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
      <div className='flex flex-col gap-5 lg:flex-row'>
        {/* FIRST_NAME_DIV */}
        <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label className='label-style' htmlFor='firstname'>First Name</label>
            <input
                name='firstname'
                id='firstname'
                placeholder='Enter First Name'
                className='form-style'
                {...register("firstname",{required:true})}
            />
            {errors.firstname && (<span className='-mt-1 text-[12px] text-red-600	'>Please enter name</span>)}
        </div>
         {/* LAST_NAME_DIV */}
         <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label className='label-style'>Last Name</label>
            <input
                className='form-style'
                id='lastname'
                name='lastname'
                placeholder='Enter Last Name'
                {...register("lastname", {required: true})}
            />
        </div>
      </div>

       {/* EMAIL_ADDRESS_DIV */}
      <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='label-style'>Email Address</label>
            <input
                id='email'
                name='email'
                className='form-style'
                placeholder='Enter Email Address'
                {...register("email", {required: true} )}
            />
               {errors.email && (
                <span className="-mt-1 text-[12px] text-red-600	">
                    Please enter your Email address.
                </span>
                )}
      </div>

      {/* PHONE_NUMBER_DIV */}
      <div className='flex flex-col gap-2'>
        <label className='label-style' htmlFor='phonenumber'>Phone Number</label>
        {/* COUNTRY_CODE_&_PHONE_NUMBER_INPUT */}
        <div className='flex gap-5'>
            {/* COUNTRY_CODE */}
            <div className='flex w-[81px] flex-col gap-2'>
            <select 
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className='form-style'
              {...register("countrycode",{required:true})}
              >
                {
                    CountryCode.map((ele,i)=>{
                      return(
                        <option key={i} value={ele.code} className=' bg-richblack-900'>
                        {ele.code} -{ele.country}
                        </option>
                      )
                    })
                }
            </select>

            </div>

            {/* PHONE_NUMBER */}
            <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                <input
                  type='number'
                  id='phonenumber'
                  name='phonenumber'
                  placeholder='123456789'
                  className='form-style'
                  {...register("phoneNo", {
                    required:{
                      value:true,
                      message: "please enter the number"
                  },
                  maxLength:{value: 12,message:"invalid number"},
                  minLength:{value: 10, message: "invalid number"}
                  })}
                />
            </div>
        </div>
        {errors.phoneNo && ( <span className="-mt-1 text-[12px] text-red-600	">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* MESSAGE_DIV */}
      <div className='flex flex-col gap-2'>
        <label htmlFor='message'>Message</label>
        <textarea 
        name='message'
        id='message'
        className='form-style'
        cols="30"
        rows="7"
        {...register("message", { required: true })}
        />
            {errors.message && (
          <span className="-mt-1 text-[12px] text-red-600	">
            Please enter your Message.
          </span>
        )}
      </div>

      {/* BUTTON */}
      <button
      disabled={loading}
      type='submit'
      className={`rounded-md bg-blue-1000 px-6 py-3 text-center text-[13px] font-bold
       text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         } 
          disabled:bg-richblack-500 sm:text-[16px] `}
      >Send Message</button>
        
      

    </form>
  )
}

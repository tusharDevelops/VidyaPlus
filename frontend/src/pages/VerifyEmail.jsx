import React from 'react'
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";


export default function VerifyEmail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState();
    const {loading, signupData} = useSelector((state)=>state.auth);

  
    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
          navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  

    function handleVerifyAndSignup(){
        const { 
            accountType,
            firstName,
            lastName,
            email,
            permissionToken,
            password,
            confirmPassword,}  = signupData;

        dispatch(signUp(  
            accountType,
            firstName,
            lastName,
            email,
            permissionToken,
            password,
            confirmPassword,
            otp,
            navigate));

    }

  return ( 
      <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-canvas dark:bg-slate-900 transition-colors duration-300">
  {loading ? (
    <div>
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="max-w-[500px] p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white tracking-tight">
        Verify Email
      </h1>
      <p className="my-4 text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
        A verification code has been sent to you. Enter the code below
      </p>
      <form onSubmit={handleVerifyAndSignup}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
              }}
              className="w-[48px] lg:w-[60px] border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white aspect-square text-center focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl font-bold"
            />
          )}
          containerStyle={{
            justifyContent: "space-between",
            gap: "0 6px",
          }}
        />
        <button
          type="submit"
          className="btn-primary w-full mt-8"
        >
          Verify Email
        </button>
      </form>
      
      <div className="mt-8 flex items-center justify-between">
        <Link to="/signup">
          <p className="text-slate-900 dark:text-white hover:text-brand-coral font-bold flex items-center gap-x-2 transition-colors">
            <BiArrowBack /> Back To Signup
          </p>
        </Link>
        <button
          className="flex items-center text-brand-coral font-bold gap-x-2 hover:underline"
          onClick={() => dispatch(sendOtp(signupData.email))}
        >
          <RxCountdownTimer />
          Resend it
        </button>
      </div>
    </div>
  )}
      </div>
);
 
}

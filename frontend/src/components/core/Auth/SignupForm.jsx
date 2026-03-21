import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp,permissionTokenCheck } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../redux/slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constant"
import Tab from "../../common/Tab"

function SignupForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",
    email: "",
    permissionToken:"",
    password: "",
    confirmPassword: "",

  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, permissionToken, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = async(e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    
    const signupData = {
      ...formData,
      accountType,
    }

    if(accountType === ACCOUNT_TYPE.INSTRUCTOR){
      const resp =  await permissionTokenCheck(accountType, permissionToken)
      if(!resp)return;
    }

     

     
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))
     

    

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      permissionToken: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-4">
          <label className="flex-1">
            <p className="mb-2 text-sm font-semibold text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-lg bg-richblack-800 px-4 py-3 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all duration-200 placeholder:text-richblack-400"
            />
          </label>
          <label className="flex-1">
            <p className="mb-2 text-sm font-semibold text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-lg bg-richblack-800 px-4 py-3 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all duration-200 placeholder:text-richblack-400"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="mb-2 text-sm font-semibold text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-lg bg-richblack-800 px-4 py-3 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all duration-200 placeholder:text-richblack-400"
          />
        </label>

        {accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <label className="w-full">
            <p className="mb-2 text-sm font-semibold text-richblack-5">
              Permission Token <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="permissionToken"
              value={permissionToken}
              onChange={handleOnChange}
              placeholder="This is a special token provided by admin"
              className="w-full rounded-lg bg-richblack-800 px-4 py-3 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all duration-200 placeholder:text-richblack-400"
            />
          </label>
        )}

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-4">
          <label className="relative flex-1">
            <p className="mb-2 text-sm font-semibold text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-lg bg-richblack-800 px-4 py-3 pr-12 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all duration-200 placeholder:text-richblack-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-11 z-10 cursor-pointer p-1 hover:bg-richblack-700 rounded transition-colors"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </button>
          </label>
          <label className="relative flex-1">
            <p className="mb-2 text-sm font-semibold text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-lg bg-richblack-800 px-4 py-3 pr-12 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all duration-200 placeholder:text-richblack-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-11 z-10 cursor-pointer p-1 hover:bg-richblack-700 rounded transition-colors"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </button>
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-gradient-to-r from-yellow-200 to-yellow-50 text-base py-3 px-4 font-semibold text-richblack-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm

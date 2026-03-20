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
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="flex-1">
            <p className="lable-style mb-1">
              First Name <sup className="text-rose-500 font-bold">*</sup>
            </p>

            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full"
            />

          </label>
          <label className="flex-1">
            <p className="lable-style mb-1">
              Last Name <sup className="text-rose-500 font-bold">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="lable-style mb-1">
            Email Address <sup className="text-rose-500 font-bold">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full"
          />
        </label>

        {
          accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
            <label className="w-full">
          <p className="lable-style mb-1">
            Permission Token <sup className="text-rose-500 font-bold">*</sup>
          </p>
          <input
            required
            type="text"
            name="permissionToken"
            value={permissionToken}
            onChange={handleOnChange}
            placeholder="This is a special token provided by admin"
            className="form-style w-full"
          />
        </label>
          ):(<></>)
        }

        <div className="flex gap-x-4">
          <label className="relative flex-1">
            <p className="lable-style mb-1">
              Create Password <sup className="text-rose-500 font-bold">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full pr-12"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>
          <label className="relative flex-1">
            <p className="lable-style mb-1">
              Confirm Password <sup className="text-rose-500 font-bold">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full pr-12"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="yellowButton w-full mt-6"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
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

  // Password Validation Criteria
  const passwordChecks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  }

  const metCount = Object.values(passwordChecks).filter(Boolean).length

  const isPasswordValid = 
    passwordChecks.minLength && 
    passwordChecks.uppercase && 
    passwordChecks.lowercase && 
    passwordChecks.number && 
    passwordChecks.specialChar

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

    if (!isPasswordValid) {
      toast.error("Password must meet all complexity requirements.")
      return
    }

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

        {/* Real-time Password Strength & Creation Indicator */}
        {password.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Strength Bar & Badge Header */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">
                Password Strength
              </span>
              <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                metCount <= 2 ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
                metCount <= 4 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              }`}>
                {metCount <= 2 ? "Weak" : metCount <= 4 ? "Medium" : "Strong"}
              </span>
            </div>

            {/* 5-Bar Progress Segment */}
            <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-full rounded-full transition-all duration-300 ${
                    level <= metCount
                      ? metCount <= 2
                        ? "bg-rose-500"
                        : metCount <= 4
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              ))}
            </div>

            {/* Interactive Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className={`flex items-center gap-1.5 transition-colors ${passwordChecks.minLength ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>
                <div className={`p-0.5 rounded-full ${passwordChecks.minLength ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  {passwordChecks.minLength ? <AiOutlineCheck className="w-3 h-3 stroke-[3]" /> : <AiOutlineClose className="w-3 h-3" />}
                </div>
                <span>At least 8 characters</span>
              </div>

              <div className={`flex items-center gap-1.5 transition-colors ${passwordChecks.uppercase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>
                <div className={`p-0.5 rounded-full ${passwordChecks.uppercase ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  {passwordChecks.uppercase ? <AiOutlineCheck className="w-3 h-3 stroke-[3]" /> : <AiOutlineClose className="w-3 h-3" />}
                </div>
                <span>One uppercase letter (A-Z)</span>
              </div>

              <div className={`flex items-center gap-1.5 transition-colors ${passwordChecks.lowercase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>
                <div className={`p-0.5 rounded-full ${passwordChecks.lowercase ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  {passwordChecks.lowercase ? <AiOutlineCheck className="w-3 h-3 stroke-[3]" /> : <AiOutlineClose className="w-3 h-3" />}
                </div>
                <span>One lowercase letter (a-z)</span>
              </div>

              <div className={`flex items-center gap-1.5 transition-colors ${passwordChecks.number ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>
                <div className={`p-0.5 rounded-full ${passwordChecks.number ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  {passwordChecks.number ? <AiOutlineCheck className="w-3 h-3 stroke-[3]" /> : <AiOutlineClose className="w-3 h-3" />}
                </div>
                <span>One number (0-9)</span>
              </div>

              <div className={`flex items-center gap-1.5 transition-colors col-span-1 sm:col-span-2 ${passwordChecks.specialChar ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>
                <div className={`p-0.5 rounded-full ${passwordChecks.specialChar ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  {passwordChecks.specialChar ? <AiOutlineCheck className="w-3 h-3 stroke-[3]" /> : <AiOutlineClose className="w-3 h-3" />}
                </div>
                <span>One special character (!@#$%^&*)</span>
              </div>
            </div>

            {/* Confirm Password Matching Status */}
            {confirmPassword.length > 0 && (
              <div className={`pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold ${
                password === confirmPassword ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
              }`}>
                <div className={`p-0.5 rounded-full ${password === confirmPassword ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/20 text-rose-500"}`}>
                  {password === confirmPassword ? <AiOutlineCheck className="w-3 h-3 stroke-[3]" /> : <AiOutlineClose className="w-3 h-3" />}
                </div>
                <span>{password === confirmPassword ? "Passwords match perfectly" : "Passwords do not match yet"}</span>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary w-full mt-6"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
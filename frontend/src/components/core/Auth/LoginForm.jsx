import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { Link, useNavigate, } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"
import { useDispatch } from "react-redux";

function LoginForm() {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-6"
    >
      <label className="w-full">
        <p className="mb-2 text-sm font-semibold leading-[1.375rem] text-richblack-5">
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
      <label className="relative">
        <p className="mb-2 text-sm font-semibold leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
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
          className="absolute right-4 top-12 z-10 cursor-pointer p-1 hover:bg-richblack-700 rounded transition-colors"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={20} fill="#AFB2BF" />
          )}
        </button>
        <Link to="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs font-semibold text-blue-100 hover:text-blue-50 transition-colors">
            Forgot Password?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-4 rounded-lg bg-gradient-to-r from-yellow-200 to-yellow-50 text-base py-3 px-4 font-semibold text-richblack-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm

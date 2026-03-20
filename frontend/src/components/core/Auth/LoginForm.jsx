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
      className="flex w-full flex-col gap-y-5"
    >
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
      <label className="relative">
        <p className="lable-style mb-1">
          Password <sup className="text-rose-500 font-bold">*</sup>
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
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="yellowButton w-full mt-4"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
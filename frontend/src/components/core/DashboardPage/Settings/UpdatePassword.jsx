import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/settingAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = (data) => {
    // console.log("password Data - ", data)
    data.confirmNewPassword = data.newPassword;
    try {
      dispatch( changePassword(token,data))
    } catch (error) {

    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 px-14 shadow-2xl shadow-indigo-500/5 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/[0.02] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 relative z-10">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-1">SECURITY PROTOCOL</p>
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Access Credentials</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            {/* Old Password */}
            <div className="relative flex flex-col gap-3">
              <label htmlFor="oldPassword" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Current Access Token
              </label>
              <div className="relative group/field">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Enter current token"
                  className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                  {...register("oldPassword", { required: true })}
                />
                <span
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] cursor-pointer p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={22} className="text-slate-400 group-hover/field:text-indigo-600 dark:group-hover/field:text-indigo-400" />
                  ) : (
                    <AiOutlineEye fontSize={22} className="text-slate-400 group-hover/field:text-indigo-600 dark:group-hover/field:text-indigo-400" />
                  )}
                </span>
              </div>
              {errors.oldPassword && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Current token is required for verification.
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="relative flex flex-col gap-3">
              <label htmlFor="newPassword" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                New Access Token
              </label>
              <div className="relative group/field">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter new token"
                  className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                  {...register("newPassword", { required: true })}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] cursor-pointer p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={22} className="text-slate-400 group-hover/field:text-indigo-600 dark:group-hover/field:text-indigo-400" />
                  ) : (
                    <AiOutlineEye fontSize={22} className="text-slate-400 group-hover/field:text-indigo-600 dark:group-hover/field:text-indigo-400" />
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Encryption depth (New token) is mandatory.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-2xl bg-slate-100 dark:bg-slate-800 py-4 px-10 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
          >
            Abort Encryption
          </button>
          <IconBtn 
            type="submit" 
            text="Commit Token Update" 
            customClasses="px-12 py-4 rounded-2xl shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
          />
        </div>
      </form>
    </>
  )
}
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/settingAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 px-14 shadow-2xl shadow-indigo-500/5 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/[0.02] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 relative z-10">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-1">DATA INTEGRITY</p>
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Profile Information</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            {/* First Name */}
            <div className="flex flex-col gap-3">
              <label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Forename Identification
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter forename"
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Forename is mandatory.
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-3">
              <label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Surname Identification
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter surname"
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Surname is mandatory.
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-3">
              <label htmlFor="dateOfBirth" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Temporal Origin (DOB)
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Temporal origin is mandatory.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Temporal origin cannot exist in future projection.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-3">
              <label htmlFor="gender" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Gender Identification
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele} className="bg-white dark:bg-slate-900 font-bold">
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Selection is mandatory.
                </span>
              )}
            </div>

            {/* Contact Number */}
            <div className="flex flex-col gap-3">
              <label htmlFor="contactNumber" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Contact Protocol
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter contact protocol"
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Communication protocol is mandatory.",
                  },
                  maxLength: { value: 12, message: "Invalid protocol length" },
                  minLength: { value: 10, message: "Invalid protocol length" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            {/* About */}
            <div className="flex flex-col gap-3">
              <label htmlFor="about" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
                Academic Abstract (Bio)
              </label>
              <textarea
                name="about"
                id="about"
                placeholder="Expound upon your professional journey..."
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm min-h-[140px] resize-none"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Academic abstract is required.
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
            Abort Modifications
          </button>
          <IconBtn 
            type="submit" 
            text="Synchronize Profile" 
            customClasses="px-12 py-4 rounded-2xl shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
          />
        </div>
      </form>
    </>
  )
}
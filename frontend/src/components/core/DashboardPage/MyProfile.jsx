import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              PROFILE
           </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          My Profile
        </h1>
        <p className="text-base font-bold text-slate-500 dark:text-slate-400">Manage your account details and information.</p>
      </div>
      
      {/* Profile Header Card */}
      <div className="group relative flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-6 px-8 shadow-xl shadow-indigo-500/5 transition-all duration-500 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/[0.03] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-600/40 transition-colors duration-500"></div>
             <img
               src={user?.image}
               alt={`profile-${user?.firstName}`}
               className="relative aspect-square w-20 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
             />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit Profile"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          customClasses="mt-6 sm:mt-0 px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
        >
          <RiEditBoxLine size={18} />
        </IconBtn>
      </div>

      {/* About Section Card */}
      <div className="group flex flex-col gap-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-6 px-8 shadow-xl shadow-indigo-500/5 transition-all duration-500">
        <div className="flex w-full items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">ABOUT</p>
             <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">About</h2>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-none"
          >
            <RiEditBoxLine size={16} />
          </IconBtn>
        </div>
        <p
          className={`leading-relaxed text-base font-bold ${
            user?.additionalDetails?.about
              ? "text-slate-600 dark:text-slate-300"
              : "text-slate-400 italic"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write something about yourself..."}
        </p>
      </div>

      {/* Personal Details Card */}
      <div className="flex flex-col gap-y-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-6 px-8 shadow-xl shadow-indigo-500/5 transition-all duration-500 mb-10">
        <div className="flex w-full items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
           <div className="space-y-1">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">DETAILS</p>
             <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Personal Details</h2>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-none"
          >
            <RiEditBoxLine size={16} />
          </IconBtn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-1 group/item">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">First Name</p>
              <p className="text-base font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.firstName}
              </p>
            </div>
            
            <div className="space-y-1 group/item">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Last Name</p>
              <p className="text-base font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.lastName}
              </p>
            </div>

            <div className="space-y-1 group/item">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Email</p>
              <p className="text-base font-black text-slate-900 dark:text-slate-200 tracking-tight break-all">
                {user?.email}
              </p>
            </div>

            <div className="space-y-1 group/item">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Phone Number</p>
              <p className="text-base font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.additionalDetails?.contactNumber ?? "Not provided"}
              </p>
            </div>

            <div className="space-y-1 group/item">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Gender</p>
              <p className="text-base font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.additionalDetails?.gender ?? "Not specified"}
              </p>
            </div>
            
            <div className="space-y-1 group/item">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Date of Birth</p>
              <p className="text-base font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Not provided"}
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}
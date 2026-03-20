import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              USER ACCOUNT
           </span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Identity Profile
        </h1>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Manage your digital presence and academic credentials.</p>
      </div>
      
      {/* Profile Header Card */}
      <div className="group relative flex flex-col sm:flex-row items-center justify-between rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 px-14 shadow-2xl shadow-indigo-500/5 transition-all duration-500 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/[0.03] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-600/40 transition-colors duration-500"></div>
             <img
               src={user?.image}
               alt={`profile-${user?.firstName}`}
               className="relative aspect-square w-[100px] rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl"
             />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400 opacity-80">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit Identity"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          customClasses="mt-8 sm:mt-0 px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
        >
          <RiEditBoxLine size={20} />
        </IconBtn>
      </div>

      {/* About Section Card */}
      <div className="group flex flex-col gap-y-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 px-14 shadow-2xl shadow-indigo-500/5 transition-all duration-500">
        <div className="flex w-full items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">ACADEMIC BIOGRAPHY</p>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Abstract</h2>
          </div>
          <IconBtn
            text="Modify"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-none"
          >
            <RiEditBoxLine size={18} />
          </IconBtn>
        </div>
        <p
          className={`leading-relaxed text-lg font-bold ${
            user?.additionalDetails?.about
              ? "text-slate-600 dark:text-slate-300"
              : "text-slate-400 italic"
          }`}
        >
          {user?.additionalDetails?.about ?? "Compose a brief architectural overview of your professional trajectory..."}
        </p>
      </div>

      {/* Personal Details Card */}
      <div className="flex flex-col gap-y-12 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-12 px-14 shadow-2xl shadow-indigo-500/5 transition-all duration-500 mb-10">
        <div className="flex w-full items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8">
           <div className="space-y-1">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">VERIFIED CREDENTIALS</p>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Personal Metadata</h2>
          </div>
          <IconBtn
            text="Refine Details"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
          >
            <RiEditBoxLine size={20} />
          </IconBtn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="space-y-2 group/item">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Given Name</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.firstName}
              </p>
            </div>
            
            <div className="space-y-2 group/item">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Family Name</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.lastName}
              </p>
            </div>

            <div className="space-y-2 group/item">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Electronic Mail</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-200 tracking-tight break-all">
                {user?.email}
              </p>
            </div>

            <div className="space-y-2 group/item">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Contact Protocol</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.additionalDetails?.contactNumber ?? "Unlisted"}
              </p>
            </div>

            <div className="space-y-2 group/item">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Gender Identification</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {user?.additionalDetails?.gender ?? "Unspecified"}
              </p>
            </div>
            
            <div className="space-y-2 group/item">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">Temporal Origin (DOB)</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-200 tracking-tight">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Unrecorded"}
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}
import {  useDispatch, useSelector } from "react-redux"
import {  useNavigate} from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import  {buyCourse}  from "../../../../services/operations/StudentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
     buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[320px] w-full lg:w-[350px] rounded-[3.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 px-12 shadow-2xl shadow-indigo-500/[0.05] transition-all duration-500 group relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/[0.03] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
      
      <div className="space-y-6 relative z-10">
        <div className="space-y-1">
           <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">AGGREGATE VALUATION</p>
           <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
             ₹{total}
           </p>
        </div>

        <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800/50 my-6"></div>

        <IconBtn
          text="Authorize Deployment"
          onclick={handleBuyCourse}
          customClasses="w-full justify-center py-5 rounded-[1.75rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-indigo-600/40 text-sm font-black uppercase tracking-widest"
        />
        
        <div className="flex flex-col items-center gap-2 pt-4">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              SECURE QUANTUM GATEWAY
           </div>
           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500/60 text-center leading-tight">
             Encrypted SSL Protocol Active.<br/>Instant curriculum delivery upon authorization.
           </p>
        </div>
      </div>
    </div>
  )
}
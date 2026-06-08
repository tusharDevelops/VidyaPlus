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
    <div className="min-w-[320px] w-full lg:w-[350px] rounded-hero border border-hairline dark:border-slate-800 bg-canvas dark:bg-slate-900 p-10 px-12 shadow-sm transition-all duration-500 group relative overflow-hidden">
      <div className="space-y-6 relative z-10">
        <div className="space-y-1">
           <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">AGGREGATE VALUATION</p>
           <p className="text-3xl font-black text-brand-coral tracking-tighter">
             ₹{total}
           </p>
        </div>

        <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800/50 my-6"></div>

        <IconBtn
          text="Authorize Deployment"
          onclick={handleBuyCourse}
          customClasses="btn-primary w-full py-5 text-sm"
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
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/settingAPI"

import { logout } from "../../../../services/operations/authAPI"
import { useState } from "react"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmation, setConfirmation] = useState("")

  const CONFIRM_TEXT = "Delete my account"

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {

    }
  }

  return (
    <>
    <div className="my-10 flex flex-col sm:flex-row gap-8 rounded-[3.5rem] border border-red-200/50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 backdrop-blur-xl p-10 px-8 shadow-2xl shadow-red-500/[0.05] transition-all duration-500 hover:shadow-red-500/[0.1] group relative overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/[0.02] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        
        <div className="flex aspect-square h-20 w-20 items-center justify-center rounded-3xl bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 shadow-xl shadow-red-500/10 group-hover:scale-110 transition-transform duration-500">
          <FiTrash2 className="text-2xl text-red-600 dark:text-red-400 animate-pulse" />
        </div>
        
        <div className="flex flex-col space-y-4 relative z-10">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-[0.3em]">DESTRUCTIVE COMMAND</p>
             <h2 className="text-3xl font-black text-red-800 dark:text-red-300 tracking-tight">Account Termination</h2>
          </div>
          
          <div className="max-w-xl space-y-4">
            <p className="text-lg font-black text-red-900 dark:text-red-200/80 leading-tight">Proceed with extreme caution. This action is irreversible.</p>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
              Account termination involves the aggregate deletion of all pedagogical progress, instructional assets, and credential history. 
              Existing enrollment in <span className="text-red-600 dark:text-red-400 font-black">Paid Curriculum</span> will be permanently forfeited without temporal restitution.
            </p>
            
            <div className="flex flex-col space-y-3 pt-2">
              <label className="text-[10px] font-black text-red-800 dark:text-red-400 uppercase tracking-widest">
                Type <span className="underline italic select-all cursor-pointer">"{CONFIRM_TEXT}"</span> to confirm
              </label>
              <input
                type="text"
                placeholder={CONFIRM_TEXT}
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                className="w-full sm:w-[320px] bg-white/50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-xl py-3 px-5 text-sm font-bold text-red-900 dark:text-red-100 placeholder:text-red-200 dark:placeholder:text-red-900/40 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>
          </div>
          
          <button
            type="button"
            disabled={confirmation !== CONFIRM_TEXT}
            className={`w-fit cursor-pointer mt-4 px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300
              ${confirmation === CONFIRM_TEXT 
                ? "bg-red-600 text-white shadow-2xl shadow-red-600/30 hover:bg-red-700 hover:scale-105 active:scale-95" 
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
              }`}
            onClick={handleDeleteAccount}
          >
            Execute Termination
          </button>
        </div>
      </div>
    </>
  )
}
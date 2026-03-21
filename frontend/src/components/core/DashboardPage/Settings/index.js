import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'
export default function Settings() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              SYSTEM PREFERENCES
           </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Account Governance
        </h1>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Refine your identity, security protocols, and platform presence.</p>
      </header>

      <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-1000">
        {/* Change Profile Picture */}
        <ChangeProfilePicture />  
        {/* Profile */}
        <EditProfile />
        {/* Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  )
}

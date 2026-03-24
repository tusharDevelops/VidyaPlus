import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { VscSignOut } from "react-icons/vsc"
import SideBarLinks from '../DashboardPage/SideBarLinks'
import ConfirmationModal from '../../common/ConfirmationModal'
import {logout} from '../../../services/operations/authAPI'


export default function SideBar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  const Links = ({ onNav }) => (
    <>
      <div className='flex flex-col gap-y-2'>
        {
          sidebarLinks.map((link) => {
            if(link.type && user?.accountType !== link.type) return null;
            return (<SideBarLinks key={link.id} link={link} iconName={link.icon} onNavClick={onNav} />)
          })
        }
      </div>

      <div className="mx-auto mt-10 mb-6 h-[1px] w-10/12 bg-slate-100 dark:bg-slate-800/50" />

      <div className='flex flex-col gap-y-2'>
        <SideBarLinks link={{name: "System Settings", path:"/dashboard/settings"}} iconName={"VscSettingsGear"} onNavClick={onNav}/>
        <button
          onClick={() => setConfirmationModal({
            text1: "Logout",
            text2: "Are you sure you want to log out from your account?",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null),
          })}
          className="group relative px-6 py-3 transition-all duration-300 hover:bg-red-500/[0.05] dark:hover:bg-red-500/[0.05] rounded-xl mx-2"
        >
          <div className="flex items-center gap-x-3">
            <VscSignOut className="text-lg text-slate-500 group-hover:text-red-500 transition-colors" />
            <span className="text-sm font-bold text-slate-500 group-hover:text-red-500 transition-colors">Logout</span>
          </div>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )

  return (
    <>
      {/* ─── Desktop Sidebar ─── */}
      <div className='hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[260px] flex-col
        border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80
        backdrop-blur-xl py-12 transition-all duration-500 shadow-2xl shadow-indigo-500/[0.02]
        overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800'>
        <Links onNav={() => {}} />
      </div>

      {/* ─── Mobile Hamburger Button ─── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-[4.5rem] left-3 z-40 p-2 rounded-xl bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700 shadow-md text-slate-600 dark:text-slate-300
          hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* ─── Mobile Overlay Backdrop ─── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─── Mobile Slide-in Sidebar ─── */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-[280px] z-50
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        shadow-2xl transition-transform duration-300 overflow-y-auto
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="flex items-center justify-between px-5 pt-5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="py-8">
          <Links onNav={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  )
}

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
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }


  return (
    <div className='flex h-[calc(100vh-3.5rem)] min-w-[260px] flex-col
    border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl py-12 transition-all duration-500 shadow-2xl shadow-indigo-500/[0.02]'>
        <div className='flex flex-col gap-y-2'>
          {
            sidebarLinks.map((link)=>{
              if(link.type && user?.accountType !== link.type)return null;
              return(<SideBarLinks key={link.id} link={link} iconName={link.icon}/>)
            })
          }
        </div>

      <div className="mx-auto mt-10 mb-10 h-[1px] w-10/12 bg-slate-100 dark:bg-slate-800/50" />

      <div className='flex flex-col gap-y-2'>
          <SideBarLinks link={{name: "System Settings", path:"/dashboard/settings"}} iconName={"VscSettingsGear"}/>
          <button
            onClick={
              ()=>setConfirmationModal({
                text1: "Terminate Session?",
                text2: "You are about to be de-authenticated from the regional gateway.",
                btn1Text: "De-authenticate",
                btn2Text: "Maintain Session",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="group relative px-8 py-4 transition-all duration-500 hover:bg-red-500/[0.03] dark:hover:bg-red-500/[0.02]"
          >
            <div className="flex items-center gap-x-4">
              <VscSignOut className="text-xl text-slate-400 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
              <span className="text-[10px] font-black text-slate-500 group-hover:text-red-500 uppercase tracking-[0.2em] transition-all duration-300">De-authenticate</span>
            </div>
          </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

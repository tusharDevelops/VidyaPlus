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
                text1: "Logout",
                text2: "Are you sure you want to log out from your account?",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="group relative px-6 py-3 transition-all duration-300 hover:bg-red-500/[0.05] dark:hover:bg-red-500/[0.05] rounded-xl mx-2"
          >
            <div className="flex items-center gap-x-3">
              <VscSignOut className="text-lg text-slate-500 group-hover:text-red-500 transition-colors" />
              <span className="text-sm font-bold text-slate-500 group-hover:text-red-500 transition-colors">Logout</span>
            </div>
          </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '../components/core/DashboardPage/SideBar'
import { Outlet } from 'react-router-dom';

export default function DashBoardPage() {

    const{loading: authLoading} = useSelector((state)=>state.auth);
    const{loading: profileLoading} = useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
        return (
          <div className='flex h-screen items-center justify-center bg-white dark:bg-slate-950'>
            <div className='w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin'></div>
          </div>
        )
    }
    
    return(
      <div className="relative flex min-h-[calc(100vh-7rem)] bg-white dark:bg-slate-950 transition-colors duration-500">
        <SideBar />
        <div className="flex-1 h-[calc(100vh-7rem)] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <div className="mx-auto w-11/12 max-w-[1200px] py-14 px-4 lg:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    )


}

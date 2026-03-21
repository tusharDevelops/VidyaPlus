import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '../components/core/DashboardPage/SideBar'
import { Outlet } from 'react-router-dom';

export default function DashBoardPage() {

    const{loading: authLoading} = useSelector((state)=>state.auth);
    const{loading: profileLoading} = useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
        return (<div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
                </div>)
    }
    
    return(
<div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1200px] py-6 md:py-10">
          <Outlet />
        </div>
      </div>
    </div>
    )


}

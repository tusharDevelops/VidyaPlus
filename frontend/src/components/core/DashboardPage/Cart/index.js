import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)
  const navigate = useNavigate()

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <>
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              SCHOLARSHIP BASKET
           </span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Curriculum Inventory
        </h1>
        <div className="flex items-center gap-4 mt-2">
           <p className="text-lg font-bold text-slate-500 dark:text-slate-400">{totalItems} Instructional Unit{totalItems !== 1 ? 's' : ''} Staged</p>
           <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></div>
           <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Ready for Deployment</p>
        </div>
      </header>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-12 lg:flex-row animate-in slide-in-from-bottom-8 duration-1000">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center p-24 text-center rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/5 dark:bg-slate-900/20 backdrop-blur-sm group hover:border-indigo-600/20 transition-all duration-500">
           <div className="relative mb-12">
              <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-colors duration-1000"></div>
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-6xl group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                🛒
              </div>
           </div>
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Inventory is Depleted</h2>
           <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto">Looks like your pedagogical staging area is currently vacant. Discover premium modules to populate your curriculum.</p>
           <button 
             onClick={() => navigate("/catalog")}
             className="mt-12 px-12 py-5 rounded-[2rem] bg-indigo-600 text-white text-sm font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-indigo-600/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
           >
             Explore Full Catalog
           </button>
        </div>
      )}
    </div>
    </>
  )
}

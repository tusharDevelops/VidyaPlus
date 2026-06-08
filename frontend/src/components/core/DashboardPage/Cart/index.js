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
      <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-hairline text-ink dark:text-white text-[10px] font-black uppercase tracking-widest">
              CHECKOUT
           </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          My Cart
        </h1>
        <div className="flex items-center gap-4 mt-2">
           <p className="text-base font-bold text-slate-500 dark:text-slate-400">{totalItems} Course{totalItems !== 1 ? 's' : ''} in Cart</p>
        </div>
      </header>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-8 lg:flex-row animate-in slide-in-from-bottom-8 duration-1000">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center p-12 text-center rounded-hero border border-hairline dark:border-slate-800 bg-canvas dark:bg-slate-900 group hover:border-ink/20 dark:hover:border-white/20 transition-all duration-500">
           <div className="relative mb-8">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-3xl group-hover:scale-110 transition-transform duration-500 shadow-sm">
                🛒
              </div>
           </div>
           <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Your Cart is Empty</h2>
           <p className="text-base font-bold text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Looks like you haven't added any courses to your cart yet. Discover premium courses to start learning today.</p>
           <button 
             onClick={() => navigate("/catalog")}
             className="btn-primary mt-8 px-8 py-3.5"
           >
             Explore Full Catalog
           </button>
        </div>
      )}
    </div>
    </>
  )
}

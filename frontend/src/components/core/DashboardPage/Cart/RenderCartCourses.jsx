import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../redux/slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col gap-8 w-full lg:w-[65%]">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className="group relative flex w-full flex-col lg:flex-row items-center justify-between gap-5 rounded-hero border border-hairline dark:border-slate-800 bg-canvas dark:bg-slate-900 p-8 px-10 shadow-sm transition-all duration-500 overflow-hidden"
        >
          <div className="flex flex-1 flex-col lg:flex-row items-center gap-8 relative z-10 w-full">
            <div className="relative shrink-0 overflow-hidden rounded-[2rem] border-4 border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-700">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[160px] w-full lg:w-[240px] object-cover rounded-[1.5rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="flex flex-col space-y-4 text-center lg:text-left flex-1">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-ink dark:text-white uppercase tracking-[0.3em]">Module Identification</p>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-brand-coral transition-colors">
                    {course?.courseName}
                 </h3>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                 <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-hairline dark:border-slate-700">
                    {course?.category?.name}
                 </span>
                 <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <span className="text-amber-500 font-black text-xs">4.5</span>
                    <ReactStars
                      count={5}
                      value={course?.ratingAndReviews?.length || 5}
                      size={14}
                      edit={false}
                      activeColor="#f59e0b"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                 </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 min-w-[180px] relative z-10 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-6 lg:pt-0 lg:pl-10">
            <div className="space-y-0.5 text-center lg:text-right">
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Aggregate Valuation</p>
               <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                 ₹{course?.price}
               </p>
            </div>
            
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="group/btn flex items-center gap-x-3 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 py-3.5 px-8 text-red-600 dark:text-red-400 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all duration-500 shadow-sm"
            >
              <RiDeleteBin6Line className="text-sm group-hover/btn:scale-125 transition-transform" />
              <span>Purge from Inventory</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
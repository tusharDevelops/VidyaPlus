import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createCategory } from '../../../../services/operations/courseDetailsAPI'
import IconBtn from '../../../common/IconBtn'

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { token } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    const result = await createCategory(data, token)
    if (result) {
      reset()
    }
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="flex w-full items-start gap-x-16">
        <div className="flex flex-1 flex-col">
          <header className="mb-16 space-y-3 pb-10 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                 SCHEMA ARCHITECT
               </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Create Category
            </h1>
            <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-2xl">
              Establish new academic classifications to organize pedagogical content across the platform.
            </p>
          </header>
          
          <div className="flex-1 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 shadow-2xl shadow-indigo-500/5 dark:shadow-none animate-in slide-in-from-bottom-8 duration-1000">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Category Name */}
              <div className="flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="name">
                  Category Designation <sup className="text-red-500 font-bold">*</sup>
                </label>
                <input
                  id="name"
                  placeholder="e.g. Theoretical Physics"
                  {...register("name", { required: true })}
                  className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                />
                {errors.name && (
                  <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                    Designation is mandatory
                  </span>
                )}
              </div>

              {/* Category Description */}
              <div className="flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="description">
                  Discipline Abstract <sup className="text-red-500 font-bold">*</sup>
                </label>
                <textarea
                  id="description"
                  placeholder="Expound upon the scope and relevance of this classification..."
                  {...register("description", { required: true })}
                  className="form-style resize-none min-h-[160px] w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
                />
                {errors.description && (
                  <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                    Discipline abstract is mandatory
                  </span>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-100 dark:border-slate-800">
                <IconBtn 
                  text="Commit Category" 
                  type="submit" 
                  customClasses="px-12 py-4 rounded-[1.25rem] shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Category Creation Tips */}
        <aside className="sticky top-10 hidden max-w-[420px] flex-1 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-md p-10 shadow-2xl shadow-indigo-500/5 dark:shadow-none xl:block group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-600/20">⚡</div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Naming Protocol</p>
              </div>
              
              <ul className="space-y-8">
                {[
                  { label: "Taxonomy Clarity", text: "Ensure the category name is distinctive and universally recognizable within academic circles." },
                  { label: "Search Optimization", text: "Incorporate keywords that potential students utilize when auditing the global directory." },
                  { label: "Discipline Scope", text: "The abstract should define the boundaries and prerequisites of the learning path." },
                  { label: "Platform Uniformity", text: "Adhere to established casing and nomenclature patterns for global consistency." },
                  { label: "Logical Hierarchies", text: "Consider how this classification integrates with existing pedagogical structures." }
                ].map((tip, i) => (
                  <li key={i} className="flex gap-4 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{tip.label}</p>
                       <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider">{tip.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 rounded-3xl bg-indigo-600/5 border border-indigo-600/10">
                 <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center">
                   System-wide propagation of new categories occurs instantaneously.
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  )
}

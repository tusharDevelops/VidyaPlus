import React from 'react'
import IconBtn from './IconBtn'

export default function ConfirmationModal({modalData}) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-900/40 backdrop-blur-md transition-all duration-300">
    <div className="w-11/12 max-w-[400px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-8 shadow-2xl shadow-indigo-500/10 scale-in-center">
      <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
        {modalData?.text1}
      </p>
      <p className="mt-4 mb-8 text-base font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
        {modalData?.text2}
      </p>
      <div className="flex items-center gap-4">
        <IconBtn
          onclick={modalData?.btn1Handler}
          text={modalData?.btn1Text}
          customClasses="flex-1 justify-center py-3 rounded-xl shadow-lg shadow-indigo-600/20"
        />
        <button
          className="flex-1 cursor-pointer rounded-xl bg-slate-100 dark:bg-slate-800 py-3 px-5 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 active:scale-95"
          onClick={modalData?.btn2Handler}
        >
          {modalData?.btn2Text}
        </button>
      </div>
    </div>
  </div>
  )
}

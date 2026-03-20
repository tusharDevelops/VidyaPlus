import React from 'react'

export default function CourseCard({cardData,currentCard,setCurrentCard}) {
  const isCurrent = currentCard === cardData.heading;
  return (
    <div 
      className={`w-full lg:w-[32%] h-[300px] flex flex-col p-6 rounded-xl transition-all duration-300 cursor-pointer
        ${isCurrent 
          ? "bg-white dark:bg-slate-800 shadow-[10px_10px_0_0_#9333ea] border border-slate-200 dark:border-slate-700" 
          : "bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80"}
      `}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className='flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 pb-6'>
        <h1 className={`text-xl font-bold ${isCurrent ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
          {cardData.heading}
        </h1>
        <p className='text-slate-500 dark:text-slate-400 text-sm leading-relaxed'>{cardData.description}</p>
      </div>
      <div className={`flex justify-between mt-auto font-medium ${isCurrent ? "text-indigo-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"}`}>
        <div className="flex items-center gap-2">
            <span className="text-lg">👥</span> {cardData.level}
        </div>
        <div className="flex items-center gap-2">
            <span className="text-lg">📚</span> {cardData.lessionNumber} Lessons
        </div>
      </div>
    </div>
  )
}

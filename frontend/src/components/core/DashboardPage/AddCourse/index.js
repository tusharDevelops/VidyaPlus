import React from 'react'
import RenderSteps from './RenderSteps'

export default function AddCourse() {
  return (
    <>
    <div className="space-y-8 sm:space-y-16">
      <div className="flex w-full flex-col lg:flex-row items-start gap-y-10 lg:gap-x-16">
        <div className="flex flex-1 flex-col">
          <header className="mb-8 sm:mb-16 space-y-3 pb-6 sm:pb-10 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                 CURRICULUM BUILDER
               </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Create New Course
            </h1>
            <p className="text-sm sm:text-xl font-bold text-slate-500 dark:text-slate-400 max-w-2xl">
              Transform your expertise into a structured learning journey. Every detail matters in building a premium experience.
            </p>
          </header>
          
          <main className="flex-1 w-full overflow-hidden">
            <RenderSteps />
          </main>
        </div>
        
        {/* Course Upload Tips */}
        <aside className="sticky top-10 hidden max-w-[420px] flex-1 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-md p-6 sm:p-10 shadow-2xl shadow-indigo-500/5 dark:shadow-none xl:block group">
           <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-600/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-600/20">⚡</div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Best Practices</p>
              </div>
              
              <ul className="space-y-8">
                {[
                  { label: "Pricing Strategy", text: "Set the price point or offer foundational knowledge for free to build your audience." },
                  { label: "Visual Assets", text: "Optimal thumbnail resolution is 1024x576. Prioritize crisp, high-contrast imagery." },
                  { label: "Instructional Video", text: "Your overview video should capture the essence of the course in under 2 minutes." },
                  { label: "Curriculum Flow", text: "Organize lessons into logical sections using the Course Builder for better retention." },
                  { label: "Interactive Content", text: "Synthesize learning with quizzes and assignments at the end of each major module." },
                  { label: "Supplementary Material", text: "Upload PDF notes and resources to provide a 360-degree learning experience." }
                ].map((tip, i) => (
                  <li key={i} className="flex gap-4 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">{tip.label}</p>
                       <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider">{tip.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 rounded-3xl bg-indigo-600/5 border border-indigo-600/10">
                 <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center">
                   Pro Tip: Engagement increases by 40% with high-quality audio sections.
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  </>
  )
}


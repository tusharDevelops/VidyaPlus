import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import PublishCourse from './PublishCourse'
export default function RenderSteps() {
    const { step } = useSelector((state) => state.course)

    const steps = [
      {
        id: 1,
        title: "Course Information",
      },
      {
        id: 2,
        title: "Course Builder",
      },
      {
        id: 3,
        title: "Publish",
      },
    ]

    return (
    <>

    <div className='relative mb-8 flex w-full justify-center'>
        {steps.map((item)=>(
            <React.Fragment key={item.id}>
                <div className='flex flex-col items-center group'>
                    <div className={`grid cursor-default aspect-square w-[50px] place-items-center
                    rounded-2xl border-2 transition-all duration-700 relative
                    ${
                    step === item.id
                    ? "border-indigo-600 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.3)] scale-110"
                    : step > item.id 
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-400"
                    }`}>
                    {
                        step > item.id ? (
                        <FaCheck className="font-black text-white text-lg" />
                        ) : (
                        <span className="font-black text-lg tracking-tighter">{item.id}</span>
                        )
                    }
                    {/* Pulsing indicator for active step */}
                    {step === item.id && (
                        <div className="absolute inset-0 rounded-2xl bg-indigo-600/20 animate-ping -z-10"></div>
                    )}
                    </div>
                </div>

                {item.id !== steps.length && (
                    <div
                    className={`h-[1px] w-[20%] self-center mx-4 transition-all duration-1000 ${
                    step > item.id  ? "bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]" : "bg-slate-200 dark:bg-slate-800"
                    } `}
                    ></div>
                )}      
            </React.Fragment>
        ))}
    </div>
    
    <div className="relative mb-16 flex w-full select-none justify-between px-6">
        {steps.map((item) => (
            <div
            className="flex min-w-[140px] flex-col items-center gap-y-2"
            key={item.id}
            >
                <p
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    step >= item.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    } ${step === item.id ? "scale-110" : ""}`}
                >
                    {item.title}
                </p>
            </div>
        ))}
    </div>

    {/* Render specific component based on current step */}
    {step === 1 && <CourseInformationForm />}
    {step === 2 && <CourseBuilderForm />}
    {step === 3 && <PublishCourse />}


    </>
    )
    }

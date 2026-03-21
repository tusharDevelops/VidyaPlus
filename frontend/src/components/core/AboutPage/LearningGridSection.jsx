import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';


const LearningGridArray = [
  {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
          "Vidya+ collaborates with a growing network of educational institutions and industry experts to offer flexible, affordable, and practical online learning solutions for individuals and organizations.",
      BtnText: "Learn More",
      BtnLink: "/",
  },
  {
      order: 1,
      heading: "Curriculum Aligned with Industry Trends",
      description:
          "Our curriculum is designed to be accessible and relevant, ensuring that you gain the skills and knowledge that meet current industry demands and enhance your career prospects.",
  },
  {
      order: 2,
      heading: "Innovative Learning Methods",
      description:
          "Vidya+ employs advanced learning methods to make education engaging and effective, incorporating technology to enhance your learning experience.",
  },
  {
      order: 3,
      heading: "Certification and Recognition",
      description:
          "Receive certifications that validate your skills and knowledge, recognized by industry leaders and valuable for advancing your career.",
  },
  {
      order: 4,
      heading: "Automated Assessment Tools",
      description:
          "Benefit from automated grading and instant feedback to track your progress and understand your strengths and areas for improvement.",
  },
  {
      order: 5,
      heading: "Career-Ready Skills",
      description:
          "Our programs are designed to equip you with practical skills and knowledge that are directly applicable to the job market, preparing you for real-world challenges.",
  },
];


export default function LearningGridSection() {
  return (
    <div className='grid mx-auto lg:grid-cols-2 xl:grid-cols-4 mb-12'>
      {
        LearningGridArray.map((card,i)=>{
            return(
                <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[320px]"} ${
              card.order % 2 === 1
                ? "bg-slate-50 dark:bg-slate-800/60 h-[320px] border border-slate-200 dark:border-slate-700/50"
                : card.order % 2 === 0
                ? "bg-white dark:bg-slate-900 h-[320px] border border-slate-200 dark:border-slate-700/50"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"} flex flex-col justify-center transition-all duration-300 hover:shadow-xl hover:z-10`}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-4 pb-10 xl:pb-0 px-8">
                <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-10 flex flex-col gap-6">
                <h1 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">{card.heading}</h1>

                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {card.description}
                </p>
              </div>
            )}
                </div>
            )
        })
      }
    </div>
  )
}

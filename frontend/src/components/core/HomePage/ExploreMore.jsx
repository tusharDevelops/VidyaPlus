


import React, { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
  "Primary (Class 1-5)",
  "Middle (Class 6-8)",
  "Secondary (Class 9-10)",
  "Senior Secondary (Class 11-12)",
];

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore.find(course => course.tag === tabsName[0]).courses);
  const [currentCard, setCurrentCard] = useState(courses[0].heading);

  const setMyCard = (element) => {
    setCurrentTab(element);
    const result = HomePageExplore.find(course => course.tag === element);
    setCourses(result.courses);
    setCurrentCard(result.courses[0].heading);
  };

  return (
    <div className='hidden md:block mt-32 relative w-full mb-10'>
      <div className='text-center text-4xl font-bold text-slate-900 dark:text-white'>
        Unlock the <HighlightText text={"Potential of Learning"} />
      </div>
      <div className='text-center text-lg text-slate-500 dark:text-slate-400 mt-4 leading-relaxed'>
        Gain the Skills to Achieve Excellence in Every Subject
      </div>

      <div className='flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
         w-fit mx-auto rounded-full mt-10 mb-[220px] shadow-sm p-1.5'>
        {
          tabsName.map((element, index) => (
            <div
              key={index}
              className={`text-[15px] px-6 py-2 rounded-full cursor-pointer
                 transition-all duration-300 ease-in-out font-semibold
                 ${currentTab === element 
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-purple-400 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          ))
        }
      </div>

      {/* CARD SECTION */}
      <div className='w-full max-w-maxContent left-[50%] top-[65%] -translate-x-[50%] flex justify-between gap-6 absolute px-5'>
        {courses.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
}

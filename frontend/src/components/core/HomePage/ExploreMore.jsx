


import React, { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
  "Free Resources",
  "New Arrivals",
  "Top Courses",
  "Skill Development",
  "Career Exploration",
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
    <div className='hidden md:block mt-24 relative'>
      <div className='text-center text-4xl'>
        Unlock the <HighlightText text={"Potential of Learning"} />
      </div>
      <div className='text-center text-lg text-richblack-300 font-bold'>
        Gain the Skills to Achieve Excellence in Every Subject
      </div>

      <div className='flex justify-between w-[80%] shadow-custom bg-richblack-800 border-richblack-100
         mx-auto rounded-full mt-5 mb-[200px]'>
        {
          tabsName.map((element, index) => (
            <div
              key={index}
              className={`text-sm px-2 py-1 my-1 mx-1 font-medium rounded-full cursor-pointer
                 transition-colors duration-400 ease-in-out
                 ${currentTab === element ? 'bg-richblack-900 text-white' : 'text-richblack-300 hover:bg-richblack-700'}`}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          ))
        }
      </div>

      {/* CARD SECTION */}
      <div className='w-11/12 left-[50%] top-[60%] -translate-x-[50%] flex gap-5 absolute'>
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

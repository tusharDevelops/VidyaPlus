import React, { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';

export default function MultiClassSubjectChapters({ classesData }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleBackClick = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else {
      setSelectedClass(null);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-gray-900">
      {!selectedClass && (<div className=' flex flex-col'>
        <h1 className="flex gap-x-2 text-3xl mb-6 text-white border-b-pure-greys-500 border-[1px] p-4 rounded-md">
        Find the perfect class for your study needs. Start exploring now 
        </h1>
        <p className=' text-pure-greys-400 text-[12px] -mt-5 mb-2'>Note: our syllabus in based on national standard book NCERT</p>
      </div>
        
      )}

      {!selectedClass ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {classesData.map((classItem, index) => (
            <button
              key={index}
              className=" bg-white border border-white rounded-lg p-4 flex items-center justify-center font-semibold text-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 hover:scale-105"
              onClick={() => handleClassClick(classItem)}
            >
              {classItem.name}
            </button>
          ))}
        </div>
      ) : !selectedSubject ? (
        <div className="w-full max-w-4xl">
          <button
            className="mb-4 flex justify-center items-center text-white hover:text-white bg-blue-1000 font-bold py-2 px-4 rounded"
            onClick={handleBackClick}
          >
          <IoChevronBack />
           <p> Back to Classes</p>
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">{selectedClass.name} Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedClass.subjects.map((subject, index) => (
              <button
                key={index}
                className="bg-white border border-white rounded-lg p-4 flex items-center justify-center font-semibold text-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 hover:scale-105"
                onClick={() => handleSubjectClick(subject)}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <button
            className="mb-4 flex justify-center items-center text-white hover:text-white bg-blue-1000 font-bold py-2 px-4 rounded"
            onClick={handleBackClick}
          >
          <IoChevronBack />
           <p> Back to Subjects</p>
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">{selectedSubject.name} Chapters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedSubject.chapters.map((chapter) => (
              <div
                key={chapter._id}
                className="bg-white border border-white rounded-lg p-4 flex items-center justify-center font-semibold text-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 hover:scale-105"
                
                onClick={
                  ()=>
                  {
                      if (chapter.notes) {
                        window.open(chapter.notes, '_blank'); // Opens PDF in a new tab
                      } else {
                        console.log("No notes available for this chapter.");
                      }
                    }

                }
              >
                {chapter.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
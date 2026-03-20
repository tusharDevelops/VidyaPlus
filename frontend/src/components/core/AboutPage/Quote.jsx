import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-xl md:text-3xl font-black mx-auto py-5 pb-20 text-center text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text font-black">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text font-black">
            {" "}
            unparalleled educational
            experience.
        </span> 
    </div>
  )
}

export default Quote
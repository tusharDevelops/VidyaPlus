import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import MapComponent from './MapComponent'

const timeline = [
    {
        Logo: Logo1,
        heading: "Innovative Learning",
        Description: "Harnessing AI tools to enhance education.",
    },
    {
        Logo: Logo2,
        heading: "Student-Centric",
        Description: "Your success is our top priority.",
    },
    {
        Logo: Logo3,
        heading: "Adaptable Education",
        Description: "Flexible learning paths to suit your needs.",
    },
    {
        Logo: Logo4,
        heading: "Problem Solving",
        Description: "Empower your future with coding skills.",
    }
    
];

export default function TimeLineSection() {
  return (
    
      <div className='w-11/12 flex flex-col md:flex-row gap-12 items-center '>

        <div className=' flex flex-col gap-16 md:w-[45%]'>
            {
                timeline.map( (element, index) => {
                    return (
                        
                        <div className='flex flex-row gap-6' key={index}>

                            <div className='w-[50px] h-[50px] bg-white flex flex-col gap-7 items-center'>

                                <img src={element.Logo} width={30} height={30} alt='ig'/>
                                {index !== 3 && <div className=" mt-3 w-10 border-b-2 border-dotted border-black rotate-90"></div>}
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                                
                            </div>



                        </div>
                        
                    )
                } )
            }
        </div>
        
        <div className='relative shadow-blue-200 w-full h-[400px] overflow-hidden  md:w-[55%]'>

            {/* <img  src={timelineImage}
            alt="timelineImage"
            className='shadow-white object-cover h-fit'
            /> */}
            <MapComponent/>
                
           

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] bottom-[1px] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    
                    <p className='text-caribbeangreen-300 text-sm'>Where to Find Us:</p>
                </div>

               


            </div>

        </div>

      </div>
   
  )
}

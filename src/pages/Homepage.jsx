import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner2.mp4"
import CodeBlock from "../components/core/HomePage/CodeBlock"
import ExploreMore from '../components/core/HomePage/ExploreMore'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import VismeForm from '../components/core/HomePage/Vismcontactform'

export default function HomePage() {
  return (
    <div>
      {/* SECTION-1 BLACK BG*/}
      <div className='flex flex-col w-screen  relative text-white bg-black'>

        <div className='w-[80%] flex flex-col mx-auto mt-12 gap-5 relative
        content-box  p-10'>

              {/* <Link to={"/signup"}>
                  <div className='w-[235px] mx-auto flex items-center  justify-between rounded-full bg-richblack-800
                  text-richblack-200 font-bold mt-5 shadow-custom p-[4px]  gap-[5px] h-[44px]'>   
                      <div className='px-[6px] py-[15px] '>Start Your Journey</div>
                      <FaArrowRight/>
                  </div>
              </Link> */}

          
              <div className=' flex justify-center text-xl md:text-4xl font-semibold mt-7'>
              <span>First {" "} Learn+ {" "}</span>
              <HighlightText text={" Then Score+"} />
              </div>

              <div className='text-richblack-300 font-bold text-base text-center antialiased md:text-xl'>
              Achieve academic excellence with our adaptable and creative practical based learning programs. Study at your own pace, access resources from anywhere with our online presence, and receive personalized feedback on projects and quizzes from our experienced instructors
              </div>
          
  {/* 
              <div className='flex justify-center gap-[24px]'>
                  <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                  <CTAButton active = {false} linkto = {"/login"}>Book a Demo</CTAButton>
              </div> */}

              <div class="cir1"></div>
              <div class="cir2"></div>

        </div>

          {/* video tag */}
          <div className='video-container'>
            <video muted loop autoPlay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>


          {/* CODE SECTION 1*/}
        <div className='relative w-11/12 mx-auto'>
              <div className='ellipse1 '></div>

              <CodeBlock 
                position={"flex-col md:flex-row justify-between"}
                heading = {<div>Anxious About Your Marks? Don’t Worry – We’re  <HighlightText text={"Committed to Your Success!"} /></div>}
                subheading = {"We’re dedicated to easing your academic worries with personalized support and resources. Our expert team offers tailored feedback and interactive tools to help you tackle challenges and reach your goals. Count on us to guide you toward success and build your confidence."}
              
                codes={`CH₄ + 2O₂ → CO₂ + 2H₂O
                det(A - λ I)
                ∫ₐᵇ f(x) dx = F(b) - F(a)
                a/sin A = b/sin B = c/sin C
                ∂/∂x (f(x)) = f'(x)
                R(t)= A left(frac{E_0}{rho_0}right)^{1/5}t^{2/5}
                We will Polish at your overall logical thinking process!
                --Regards Vidya+
                
                `}
                ctabtn1 = {
                  {
                  btnText: "try it yourself",
                  linkto: "/signup",
                  active: true,
                  }
                }

                ctabtn2 = {
                  {
                    btnText: "learn more",
                    linkto: "/login",
                    active: false,
                  }
                }
              />
        </div>
        
           {/* CODE SECTION 2*/}
        <div className='relative w-11/12 mx-auto'>
        <div className='ellipse2'></div>
        <CodeBlock 
          position={"flex-col md:flex-row-reverse justify-between"}
          heading = { <div className="text-4xl font-semibold">
                You have a lot to Learn-
                <HighlightText text={"No Info Only Wisdom"} />
                
              </div>}
         subheading={"We understand that mastering a subject requires more than just theory. That’s why our institute offers a blend of theoretical learning and practical application."}
          codes = {`"What we learn with pleasure we never forget." — Alfred Mercier\n
          When we learn something that excites us, like playing a favorite sport or a musical instrument, the joy we feel makes the lessons stick with us. This enjoyable learning process helps ensure that the knowledge and skills we acquire remain with us for a lifetime.`}
          ctabtn1 = {
            {
            btnText: "try it yourself",
            linkto: "/signup",
            active: true,
            }
          }

          ctabtn2 = {
            {
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }
          }


        />
        </div>


          {/* explore more section */}
        <ExploreMore/>
      </div>

        {/* SECTION 2 white bg */}
      <div className=' bg-pure-greys-5  '>
            <div className='homepage_bg h-14 md:h-[310px]' >
                <div className='w-11/12 max-w-maxContent h-[80%] flex justify-center items-end'>
                          <div className='h-[80%]'></div>
                          <div className='hidden md:flex flex-row  gap-7 text-white '>
                              <CTAButton active={true} linkto={"/signup"}>
                                  <div className='flex items-center gap-3 text-richblack-900' >
                                      Explore Full Catalog
                                      <FaArrowRight />
                                  </div>
                                  
                              </CTAButton>
                              <CTAButton active={false} linkto={"/signup"}>
                                  <div>
                                      Learn more
                                  </div>
                              </CTAButton>
                          </div>

                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex flex-col md:flex-row gap-5 mb-10 mt-[95px]'>
                      <div className='text-4xl font-semibold md:w-[45%]'>
                          Ace your academic pace with the help of  
                          <HighlightText text={"Technology"} />
                      </div>

                      <div className='flex flex-col gap-10 md:w-[40%] items-start'>
                      <div className='text-[16px]'>
                      At Vidya+, we use AI tools to enhance our teaching methods and help students learn more effectively. Our platform also educates students about AI, preparing them for the future.
                      </div>
                      <CTAButton active={true} linkto={"/signup"}>
                          <div>
                              Learn more
                          </div>
                      </CTAButton>
                      </div>

                </div>

                <TimeLineSection/>

               
                <VismeForm/>

            </div>
      </div>

      {/*Section 3 BLACK BG */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection/>
          {/* <h2 className='text-center text-4xl font-semobold mt-10 mb-20'>Reviews from other learners</h2> */}
          {/* Review Slider here */}
      </div>

      {/* FOOTER */}

      <Footer/>


  </div>
  );
}

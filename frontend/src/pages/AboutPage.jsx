import React from 'react'
import FoundingStory from "../assets/Images/WhatsApp Image 2024-07-28 at 23.26.37_c0b46600.jpg"
import BannerImage1 from "../assets/Images/abts1.jpg"
import BannerImage2 from "../assets/Images/abts2.jpg"
import BannerImage3 from "../assets/Images/abts3.jpg"
import HighlightText from '../components/core/HomePage/HighlightText'
import Quote from '../components/core/AboutPage/Quote'
//import StatsBar from '../components/core/AboutPage/StatsBar'
import LearningGridSection from '../components/core/AboutPage/LearningGridSection'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer';

export default function AboutPage() {
  return (
    <div>
      {/* SECTION-1 */}
      <section className="bg-canvas dark:bg-slate-900 transition-colors duration-500 relative overflow-hidden">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-5 text-center">
          <header className="mx-auto py-12 text-4xl md:text-5xl font-black text-slate-900 dark:text-white lg:w-[80%] tracking-tight leading-tight">
            Guiding School Students to
            <HighlightText text={" Board Excellence"} />
            <p className="mx-auto mt-8 text-center text-xl font-bold text-slate-500 dark:text-slate-400 lg:w-[95%] leading-relaxed max-w-4xl italic border-x-4 border-hairline dark:border-slate-800 px-10">
              VidyaPlus Academy provides comprehensive K-12 coaching and school-level handholding, ensuring every student has the tools and mentorship needed to ace their exams and build a brighter future.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[90%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-8 px-4">
            <img src={BannerImage1} className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 border-8 border-white dark:border-slate-800" alt="" />
            <img src={BannerImage2} className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 border-8 border-white dark:border-slate-800" alt="" />
            <img src={BannerImage3} className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 border-8 border-white dark:border-slate-800" alt="" />
          </div>
        </div>
      </section>

      {/* SECTION-2 */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-500 relative z-10">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-5 text-slate-600 dark:text-slate-400">
          <div className="h-[200px] "></div>
          <Quote />
        </div>
      </section>

      {/* SECTION-3 */}
      <section className="bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-5 pb-20">
          <div className="flex flex-col items-center gap-8 lg:flex-row justify-between py-12">
            <div className="flex lg:w-[50%] flex-col gap-8">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Our Founding Story
              </h1>
              <div className="space-y-6 text-lg font-bold text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                <p>
                  Our founders, experienced educators themselves, witnessed the immense pressure and lack of structured guidance faced by school students preparing for crucial board exams. They saw firsthand how students struggled without proper mentorship.
                </p>
                <p className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-hairline border-l-8 border-l-brand-coral">
                  Driven by a vision to transform K-12 education, they established VidyaPlus Academy to provide comprehensive school-level handholding, ensuring every student from classes 1 to 12 can approach their board exams with confidence.
                </p>
              </div>
            </div>

            <div className='relative group'>
              <img
                src={FoundingStory}
                alt=""
                className="rounded-hero shadow-sm border border-hairline dark:border-slate-800 lg:max-w-[480px] relative z-10 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <div className="flex flex-col gap-8 p-12 rounded-hero bg-slate-50 dark:bg-slate-900/40 border border-hairline dark:border-slate-800 shadow-sm transition-all duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white text-3xl shadow-sm group-hover:scale-110 transition-transform">👁️</div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Our Vision
              </h1>
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                VidyaPlus Academy aims to create an environment where school students thrive academically. Our mission goes beyond syllabus completion—we aim to foster critical thinking, subject mastery, and board exam excellence through structured daily coaching.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 p-12 rounded-hero bg-slate-50 dark:bg-slate-900/40 border border-hairline dark:border-slate-800 shadow-sm transition-all duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-magenta flex items-center justify-center text-white text-3xl shadow-sm group-hover:scale-110 transition-transform">🚀</div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Our Mission
              </h1>
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                Our mission is to deliver the highest quality school-level education handholding. Through expert mentorship, rigorous mock exams, and verified achievement certificates, we ensure every Class 1 to 12 student achieves their full potential and outstanding board results.
              </p>
            </div>
          </div>
      </div>
      </section>

      {/* SECTION-4 grid + form*/}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-32 pb-32">
        <LearningGridSection/>
        <ContactFormSection/>
      </section>

      {/* REVIEW_SECTION */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-6 bg-transparent pb-32">
        <div className="space-y-4 text-center">
           <p className="text-[10px] font-black text-ink dark:text-white uppercase tracking-[0.3em]">STUDENT PERSPECTIVES</p>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
             Global Scholarly Review
           </h1>
        </div>
        {/* <ReviewSlider /> */}
      </div>

      {/* FOOTER  section*/}
      <Footer />







    </div>
  )
}

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
      <section className="bg-slate-50 dark:bg-slate-900 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-600/[0.02] blur-[120px] pointer-events-none"></div>
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center">
          <header className="mx-auto py-24 text-5xl font-black text-slate-900 dark:text-white lg:w-[80%] tracking-tight leading-tight">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"} />
            <p className="mx-auto mt-8 text-center text-xl font-bold text-slate-500 dark:text-slate-400 lg:w-[95%] leading-relaxed max-w-4xl italic border-x-4 border-indigo-600/20 px-10">
              Vidya+ is transforming online education by embracing the latest technologies. Our mission is to build a brighter future through innovative courses and a vibrant, supportive learning community.
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
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-slate-600 dark:text-slate-400">
          <div className="h-[200px] "></div>
          <Quote />
        </div>
      </section>

      {/* SECTION-3 */}
      <section className="bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 pb-20">
          <div className="flex flex-col items-center gap-16 lg:flex-row justify-between py-24">
            <div className="flex lg:w-[50%] flex-col gap-8">
              <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-5xl font-black text-transparent tracking-tight">
                Our Founding Story
              </h1>
              <div className="space-y-6 text-lg font-bold text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                <p>
                  Our founder grew up in a poor family, struggling with limited access to education and resources. Despite these challenges, he was determined to learn and succeed, studying under a kerosene lamp with borrowed books.
                </p>
                <p className="p-8 rounded-3xl bg-indigo-600/[0.03] border-l-8 border-indigo-600 dark:bg-indigo-400/[0.02]">
                  Driven by a vision to transform education, he worked tirelessly to gain experience in the tech industry. His goal was to create Vidya+, an edtech platform designed to bridge the educational gap between privileged and underprivileged students.
                </p>
              </div>
            </div>

            <div className='relative group'>
              <div className="absolute inset-0 bg-indigo-600/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <img
                src={FoundingStory}
                alt=""
                className="rounded-[3rem] shadow-2xl shadow-indigo-500/10 border-8 border-white dark:border-slate-800 lg:max-w-[480px] relative z-10 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="flex flex-col gap-8 p-12 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/[0.02] hover:shadow-indigo-500/[0.05] transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">👁️</div>
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-4xl font-black text-transparent tracking-tight">
                Our Vision
              </h1>
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                Vidya+ uses advanced technology to offer high-quality courses and build a vibrant learning community. Our mission goes beyond providing information—we aim to foster wisdom, critical thinking, and a deep understanding of subjects. We believe that education should nurture thoughtful individuals, preparing them for success in a complex world.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 p-12 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/[0.02] hover:shadow-indigo-500/[0.05] transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">🚀</div>
              <h1 className="bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text text-4xl font-black tracking-tight">
                Our Mission
              </h1>
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing. Join us in our mission to ensure every student, regardless of their background, can achieve their full potential.
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
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-12 bg-transparent pb-32">
        <div className="space-y-4 text-center">
           <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">STUDENT PERSPECTIVES</p>
           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
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

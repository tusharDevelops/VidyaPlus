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
      <section className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center">
          <header className="mx-auto py-20 text-4xl font-black text-slate-900 dark:text-white lg:w-[70%] tracking-tight">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-6 text-center text-lg font-medium text-slate-600 dark:text-slate-400 lg:w-[95%] leading-relaxed">
            Vidya+ is transforming online education by embracing the latest technologies. Our mission is to build a brighter future through innovative courses and a vibrant, supportive learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[90%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-6">
            <img src={BannerImage1} className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white dark:border-slate-800" alt="" />
            <img src={BannerImage2} className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white dark:border-slate-800" alt="" />
            <img src={BannerImage3} className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white dark:border-slate-800" alt="" />
          </div>
        </div>
      </section>

      {/* SECTION-2 */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-slate-600 dark:text-slate-400">
          <div className="h-[140px] "></div>
          <Quote />
        </div>
      </section>

      {/* SECTION-3 */}
      <section className="bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-6">
              <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-black text-transparent lg:w-[70%] tracking-tight">
                Our Founding Story
              </h1>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-400 lg:w-[95%] leading-relaxed">
              Our founder grew up in a poor family, struggling with limited access to education and resources. Despite these challenges, he was determined to learn and succeed, studying under a kerosene lamp with borrowed books.
              <br/><br/>
            Driven by a vision to transform education, he worked tirelessly to gain experience in the tech industry. His goal was to create Vidya+, an edtech platform designed to bridge the educational gap between privileged and underprivileged students.
              </p>
             
            </div>

            <div className='mt-6'>
              <img
                src={FoundingStory}
                alt=""
                className="rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 lg:max-w-[450px]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-20 lg:flex-row justify-between mb-20">
            <div className="flex lg:w-[45%] flex-col gap-6">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-4xl font-black text-transparent lg:w-[70%] tracking-tight">
                Our Vision
              </h1>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-400 lg:w-[95%] leading-relaxed text-justify">
              Vidya+ uses advanced technology to offer high-quality courses and build a vibrant learning community. Our mission goes beyond providing information—we aim to foster wisdom, critical thinking, and a deep understanding of subjects. We believe that education should nurture thoughtful individuals, preparing them for success in a complex world.
              </p>
            </div>
            <div className="flex lg:w-[45%] flex-col gap-6">
              <h1 className="bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text text-4xl font-black lg:w-[70%] tracking-tight">
              Our Mission
              </h1>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-400 lg:w-[95%] leading-relaxed text-justify">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing.
              Join us in our mission to ensure every student, regardless of their background, can achieve their full potential through meaningful education.
              </p>
            </div>
          </div>
      </div>
      </section>

      {/* STATS_BAR*/}
      {/* <StatsBar/> */}
      {/* STATS_BAR_ENDS_HERE */}

      {/* SECTION-4 grid + form*/}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-20">
        <LearningGridSection/>
        <ContactFormSection/>
      </section>

      {/* REVIEW_SECTION */}
      <div className="relative mx-auto mt-20 pb-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-transparent">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>

      {/* FOOTER  section*/}
      <Footer />







    </div>
  )
}
